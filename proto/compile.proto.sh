protoc \
--plugin=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_out=./build *.proto \
--ts_proto_opt=nestJs=true,outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false
