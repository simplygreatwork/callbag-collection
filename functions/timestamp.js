
import { greet, deliver, terminate } from './types.js'

export function timestamp(id) {
	
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			source(greet, function(type, data) {
				if (type === deliver) {
					let timestamp = id++
					if (false) timestamp = `${Date.now()}-${timestamp}`
					data.timestamp = timestamp
				}
				sink(type, data)
			})
		}
	}
}
