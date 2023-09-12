
import { greet, deliver, terminate } from './types.js'

export function validate() {
	
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			source(greet, function(type, data) {
				sink(type, data)
			})
		}
	}
}
