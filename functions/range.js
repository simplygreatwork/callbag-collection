
import { greet, deliver, terminate } from './types.js'
import { binary_search } from 'binary-search'

export function range(key, seek, collection) {
	
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			let talkback
			source(greet, function(type, data) {
				if (type === greet) {
					talkback = data
					talkback(deliver)
					sink(type, data)
				} else if (type === deliver) {
					collection = collection || data.collection
					find(collection, collection.indexes[key], key, seek, sink)
					talkback(deliver)
				} else {
					sink(type, data)
				}
			})
		}
	}
}

function find(collection, indexed, key, seek, sink) {
	
	let { bias, begin, end, condition } = config(seek)
	let provider = create_provider(collection.items, indexed, key)
	let index = begin ? binary_search(indexed, begin, provider, bias).index : 0
	if (index >= 0) {
		let value = provider(index)
		while (condition(value)) {
			sink(deliver, collection.items[indexed[index]])
			index = index + bias
			value = provider(index)
		}
	}
}

function config(seek) {
	
	if (seek['==']) {
		seek['>='] = seek['==']
		seek['<='] = seek['==']
	}
	
	let result = null
	if (seek.sort == '-') {
		result = {
			bias: -1,
			begin: seek['<='],
			end: seek['>='],
			condition: function(value) {
				return value && (
				value.localeCompare(seek['>=']) > 0 ||
				value.localeCompare(seek['>=']) === 0
			)}
		}
	} else {
		result = {
			bias: 1,
			begin: seek['>='],
			end: seek['<='],
			condition: function(value) {
				return value && (
				value.localeCompare(seek['<=']) < 0 ||
				value.localeCompare(seek['<=']) === 0
			)}
		}
	}
	if (! result.end) {
		result.condition = function(value) {
			return value
		}
	}
	return result
}

function create_provider(collection, indexed, key) {
	
	return function(index) {
		let object = collection[indexed[index]]
		if (object && object[key]) return object[key]
	}
}
