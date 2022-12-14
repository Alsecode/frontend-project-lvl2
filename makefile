install:
	npm ci
	
gendiff -h:
	node bin/gendiff.js
	
publish:
	npm publish --dry-run
	
lint:
	npx eslint .
	
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
	
test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --bail --watch
	
	
