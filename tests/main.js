
import { test_suite_new, test_suite_run } from 'test-suite'

let suite = test_suite_new()
let { it } = suite

it('appends an item', function() {
	return true
})

it('appends an item then increments', function() {
	return false
})

it('appends an item then increments twice', function() {
	return true
})

let result = test_suite_run(suite)
if (result) console.log(`All tests passed.`)
else console.log(`Some tests failed.`)
