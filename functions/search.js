
import { greet, deliver, terminate } from './types.js'
import { pipe } from 'callbags-sourced'
import { map } from 'callbags-sourced'
import { make_subject } from 'callbags-sourced'
import { observe } from 'callbags-sourced'
import { consume } from 'callbags-original'
import { each } from 'callbags-original'
import { done } from 'callbags-original'

export function search() {
	
	let selects = Array.from(arguments)
	return function(source) {
		return function(start, sink) {
			if (start !== greet) return
			source(greet, function(type, data) {
				if (type === deliver) {
					select(selects, data, sink)
				} else {
					sink(type, data)
				}
			})
		}
	}
}

function select(selects, data, sink) {
	
	let sets = []
	selects.forEach(function(select, index) {
		let set_ = []
		sets.push(set_)
		let subject = make_subject()
		pipe(
			subject,
			select,
			each(o => set_.push(o)),
			done(x => x),
			observe()
		)
		subject(deliver, data)
		subject(terminate)
	})
	intersect(sets).forEach(each => sink(deliver, each))
	sink(terminate)
}

function intersect(sets) {
	
	let a = sets.shift()
	sets.forEach(function(b) {
		a = [...a].filter(o => [...b].includes(o))
	})
	return a
}

function union(sets) {
	
	let a = sets.shift()
	sets.forEach(function(b) {
		a = new Set([...a, ...b])
	})
	return a
}
