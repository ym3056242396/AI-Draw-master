let db = null
const defaultTableName = 'history'
export default {
	init(tableName = defaultTableName) {
		let request = window.indexedDB.open('ai-draw', 1)
		return new Promise((resolve, reject) => {

			// 数据库操作过程中出错，则错误回调被触发
			request.onerror = (event) => {
				console.log("db init报错" + event)
				reject()
			}
			
			request.onsuccess = (event) => {
				db = event.target.result
				console.log("db init成功")
				resolve()
			}
			
			request.onupgradeneeded = (event) => {
                
			   db = event.target.result
			   let objectStore = db.createObjectStore(tableName, { keyPath: 'id' })
			//    objectStore.createIndex('key', 'key', { unique: true })
			   console.log("db onupgradeneeded 成功")
			   resolve()
			}
		})
	},
	isConnected(tableName = defaultTableName){
		return db != null
	},
	set(tableName = defaultTableName, val, id = 100){
		let request = db.transaction(tableName, 'readwrite')
		          .objectStore(tableName)
		          .add({
					  id: id,
					  data: val
				  })
		return new Promise((resolve, reject) => {
			request.onsuccess = (event) => {
				console.info('添加成功', event)
				resolve(event)
			}
			request.onerror = (event) => {
				console.info('添加失败')
				reject(event)
			}
		})
	},
	put(tableName = defaultTableName, val, id = 100){
		let request = db.transaction(tableName, 'readwrite')
		          .objectStore(tableName)
		          .put({
					  id: id,
					  data: val
				  })
		return new Promise((resolve, reject) => {
			request.onsuccess = (event) => {
				console.info('添加成功', event)
				resolve(event)
			}
			request.onerror = (event) => {
				console.info('添加失败')
				reject(event)
			}
		})
	},
	getAll(tableName = defaultTableName){
		let request = db.transaction(tableName, 'readwrite')
		          .objectStore(tableName)
		          .index('key')
				  .getAll()
				  
		console.info("开水获取全部")
		
		return new Promise((resolve, reject) => {
			request.onsuccess = (event) => {
				console.info('获取成功')
				resolve(request.result)
			}
			request.onerror = (event) => {
				console.info('获取失败')
				reject(event)
			}
		})
	},
	get(tableName = defaultTableName, id = 100){
		let request = db.transaction(tableName, 'readwrite')
		          .objectStore(tableName).get(id)
				  
		console.info("获取")
		
		return new Promise((resolve, reject) => {
			request.onsuccess = (event) => {
				console.info('获取成功')
				resolve(request.result)
			}
			request.onerror = (event) => {
				console.info('获取失败')
				reject(event)
			}
		})
	},
	del(tableName = defaultTableName, id = 100){
		
		let request = db.transaction(tableName, 'readwrite')
		          .objectStore(tableName)
				  .delete(id)
		
				  
		console.info("开始删除")
		
		return new Promise((resolve, reject) => {
			request.onsuccess = (event) => {
				console.info('删除成功')
				resolve(request.result)
			}
			request.onerror = (event) => {
				console.info('删除失败')
				reject(event)
			}
		})
	}
		
}