
import { greet, deliver, terminate } from './types.js'
import { pipe } from 'callbags-sourced'
import { from_iterable } from 'callbags-sourced'
import { iterate } from 'callbags-sourced'
import { each } from 'callbags-original'
import { consume } from 'callbags-original'
import { binary_search } from 'binary-search'

export function index(key, collection) {
	
	collection.indexes = collection.indexes || {}
	collection.indexes[key] = collection.indexes[key] || []
	let indexed = collection.indexes[key]
	let provider = create_provider(collection.items, indexed, key)
	
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			source(greet, function(type, data) {
				if (type == deliver) {
					insert(collection, indexed, key, data, provider)
				}
				sink(type, data)
			})
		}
	}
}

function insert(collection, indexed, key, data, provider) {
	
	let result = binary_search(indexed, data[key], provider)
	let index = result.index >= 0 ? result.index : result.insert
	indexed.splice(index, 0, collection.items.length - 1)
}

function create_provider(collection, indexed, key) {
	
	return function(index) {
		let object = collection[indexed[index]]
		if (object && object[key]) return object[key]
	}
}
