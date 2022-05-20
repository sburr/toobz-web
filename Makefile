.PHONY: all build

all: build

build:
	echo "===> Building JavaScript package..."
	yarn build
	echo "Done."