/* Local-first private article storage. No article content is sent to a server. */
(function attachCiyueArticleStore(root) {
  "use strict";
  const DB_NAME = "CiyueDB";
  const DB_VERSION = 1;
  const STORE_NAME = "articles";
  const META_STORE = "meta";
  const schema = root.CiyueArticleSchema;
  let opening;

  function openDb() {
    if (opening) return opening;
    if (!root.indexedDB) return Promise.reject(new Error("当前浏览器不支持本地文章库（IndexedDB）"));
    opening = new Promise((resolve, reject) => {
      const request = root.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: "id" });
        if (!db.objectStoreNames.contains(META_STORE)) db.createObjectStore(META_STORE, { keyPath: "key" });
      };
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => db.close();
        resolve(db);
      };
      request.onerror = () => reject(request.error || new Error("打开本地文章库失败"));
      request.onblocked = () => reject(new Error("文章库正在被其他页面升级，请关闭旧标签页后重试"));
    }).catch(error => { opening = null; throw error; });
    return opening;
  }

  function requestValue(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("本地文章库读写失败"));
    });
  }

  async function listArticles() {
    const db = await openDb();
    const tx = db.transaction(STORE_NAME, "readonly");
    return requestValue(tx.objectStore(STORE_NAME).getAll());
  }

  async function getDictionaries() {
    const db = await openDb();
    const tx = db.transaction(META_STORE, "readonly");
    const record = await requestValue(tx.objectStore(META_STORE).get("dictionaries"));
    return record && record.value || {};
  }

  async function importArticles(items, options = {}) {
    if (!Array.isArray(items)) throw new TypeError("文章列表格式错误");
    const mode = options.duplicates === "overwrite" ? "overwrite" : "skip";
    const normalized = items.map(schema.normalizeArticle);
    const reserved = new Set(options.reservedIds || []);
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_NAME, META_STORE], "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const meta = tx.objectStore(META_STORE);
      const keysRequest = store.getAllKeys();
      const dictionaries = options.dictionaries && typeof options.dictionaries === "object" ? options.dictionaries : null;
      let result;
      keysRequest.onsuccess = () => {
        const existing = new Set(keysRequest.result.map(String));
        let added = 0, replaced = 0, skipped = 0;
        for (const article of normalized) {
          if (reserved.has(article.id)) { skipped++; continue; }
          if (existing.has(article.id) && mode === "skip") { skipped++; continue; }
          if (existing.has(article.id)) replaced++;
          else added++;
          store.put(article);
          existing.add(article.id);
        }
        result = { added, replaced, skipped };
      };
      keysRequest.onerror = () => { try { tx.abort(); } catch {} reject(keysRequest.error || new Error("读取已有文章失败")); };
      if (dictionaries) {
        const currentDictionaries = meta.get("dictionaries");
        currentDictionaries.onsuccess = () => {
          const current = currentDictionaries.result && currentDictionaries.result.value || {};
          meta.put({ key: "dictionaries", value: { ...current, ...dictionaries } });
        };
        currentDictionaries.onerror = () => { try { tx.abort(); } catch {} reject(currentDictionaries.error || new Error("读取文章库词典失败")); };
      }
      tx.oncomplete = () => resolve(result || { added: 0, replaced: 0, skipped: 0 });
      tx.onerror = () => reject(tx.error || new Error("写入文章库失败"));
      tx.onabort = () => reject(tx.error || new Error("文章库事务已取消"));
    });
  }

  async function clearArticles() {
    const db = await openDb();
    const tx = db.transaction([STORE_NAME, META_STORE], "readwrite");
    tx.objectStore(STORE_NAME).clear();
    tx.objectStore(META_STORE).clear();
    await new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error || new Error("清空文章库失败"));
      tx.onabort = () => reject(tx.error || new Error("清空文章库事务已取消"));
    });
  }

  async function exportLibrary() {
    const db = await openDb();
    const tx = db.transaction([STORE_NAME, META_STORE], "readonly");
    const [articles, dictionariesRecord] = await Promise.all([
      requestValue(tx.objectStore(STORE_NAME).getAll()),
      requestValue(tx.objectStore(META_STORE).get("dictionaries")),
    ]);
    return {
      product: "Ciyue",
      schemaVersion: schema.SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      dictionaries: dictionariesRecord && dictionariesRecord.value || {},
      articles,
    };
  }

  async function importLibrary(text, options = {}) {
    const parsed = schema.parseLibrary(text);
    const result = await importArticles(parsed.library.articles, { ...options, dictionaries: parsed.library.dictionaries });
    return { ...result, duplicateInFile: parsed.duplicateInFile, total: parsed.library.articles.length };
  }

  root.CiyueArticleStore = { openDb, listArticles, getDictionaries, importArticles, importLibrary, exportLibrary, clearArticles };
})(typeof window !== "undefined" ? window : globalThis);
