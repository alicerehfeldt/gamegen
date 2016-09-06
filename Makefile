WEBPACK="./node_modules/.bin/webpack"
WEBPACK_DEV="./node_modules/.bin/webpack-dev-server"
DIST_DIR:="./dist"
SOURCES = $(shell find src -type f)
.PHONY: clean build dist

dist:
	make clean
	make build

node_modules: package.json
	npm cache clean
	npm install

build: $(source) node_modules
	$(WEBPACK) \
		--colors \
		--verbose \
		--progress \
		--display-chunks \
		--optimize-dedupe \
		---bail

clean:
	rm -rf $(DIST_DIR)

develop: node_modules
	$(WEBPACK_DEV) \
		--port 8888 \
		--inline
