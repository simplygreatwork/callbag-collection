
import { greet, deliver, terminate } from './types.js'

export function insert(collection) {
	
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			source(greet, function(type, data) {
				if (type === deliver) {
					collection.items.push(data)
				}
				sink(type, data)
			})
		}
	}
}
