# 1. ベースとなるイメージ（AWSが提供するLambda専用のNode.jsイメージ）
FROM public.ecr.aws/lambda/nodejs:20

# 2. プログラムを配置するディレクトリへ移動
WORKDIR ${LAMBDA_TASK_ROOT}

# 3. 依存関係（package.jsonなど）をコピーしてインストール
COPY package*.json ./
RUN npm install

# 4. プログラム本体（index.js）をコピー
COPY index.js ./

# 5. 実行する関数を指定（ファイル名.関数名）
CMD [ "index.handler" ]