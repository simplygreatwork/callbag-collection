
import { collection_new } from 'collection'
import { collection_load } from 'collection'

export function Collection(name) {
	Object.assign(this, collection_new(name))
}

Object.assign(Collection.prototype, {
	load: function() { collection_load(this) }
})
