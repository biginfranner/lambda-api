const {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TABLE_NAME = process.env.MEMO_TABLE_NAME;

exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event));

  try {
    const body = event.body ? JSON.parse(event.body) : {};

    if (event.httpMethod === "POST") {
      const params = {
        TableName: TABLE_NAME,
        Item: {
          id: { S: Date.now().toString() },
          text: { S: body.text || "" },
        },
      };

      await client.send(new PutItemCommand(params));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Added" }),
      };
    }

    if (event.httpMethod === "GET") {
      const data = await client.send(
        new ScanCommand({
          TableName: TABLE_NAME,
        }),
      );

      return {
        statusCode: 200,
        body: JSON.stringify(data.Items),
      };
    }

    return {
      statusCode: 400,
      body: "Unsupported method",
    };
  } catch (err) {
    console.error("Error in handler:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Error" }),
    };
  }
};
