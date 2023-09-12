
import { greet, deliver, terminate } from './types.js'
import { binary_search } from 'binary-search'

export function sort(key, bias) {
	
	bias = (bias === '-') ? -1 : 1 
	let array = []
	let provider = create_provider(array, key)
	
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			source(greet, function(type, data) {
				if (type === greet) {
					sink(type, data)
				} else if (type === deliver) {
					insert(array, data, key, provider, bias)
				} else if (type === terminate) {
					array.forEach(function(each) {
						sink(deliver, each)
					})
					sink(terminate)
				}
			})
		}
	}
}

function insert(array, data, key, provider, bias) {
	
	let result = binary_search(array, data[key], provider, bias)
	let index = result.index >= 0 ? result.index : result.insert
	if (bias === -1) index = array.length - index
	array.splice(index, 0, data)
}

function create_provider(array, key) {
	
	return function(index) {
		let object = array[index]
		if (object && object[key]) return object[key]
	}
}
