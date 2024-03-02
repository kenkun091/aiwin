State.init({ models: [] })
const CONTRACT_ID = "0xe29f8038d1a3445ab22ad1373c65ec0a6e1161a4"
const example_json = {
  "model_name": "distilBert-sentiment-classifier",
  "model_description": "The distilBert-sentiment-classifier is a streamlined AI model that leverages the distilled version of the BERT (Bidirectional Encoder Representations from Transformers) architecture to perform sentiment analysis. Designed for efficiency and speed, it classifies texts into sentiment categories such as positive, negative, and neutral with a high degree of accuracy. This model is particularly useful for analyzing customer feedback, social media posts, and product reviews, enabling businesses and researchers to gauge public sentiment and insights quickly.",
  "python_requirements":
  {
    "python": "3.9.13",
    "requirements":
    {
      "accelerate": "0.27.2",
      "pytorch": "1.12.1",
      "transformers": "4.38.2",
      "datasets": "2.17.1",
      "huggingface-hub": "0.21.3",
      "numpy": "1.23.4",
      "pandas": "1.5.2",
      "tokenizers": "0.15.2",
      "torch": "2.2.0",
      "tqdm": "4.66.2"
    }
  },
  "finetuning_parameters": {
    "batch_size": 8,
    "learning_rate": 5e-5,
    "num_epochs": 3,
    "random_seed": 42
  },
  "finetune_data_hash": "36bbafbde8fc67c03221f17face0e64136cb04d059a3d6936e35fcda6891ce02",
  "finetuned_model_hash": "dd2a7a30f0822b2d5d6a4b1ead1ceafea2cc15867fc3650b7f5348e64f3818e0",
  "finetuned_from": "0x91CfC8d11E02723F7335D00ec60A9d309ef30773",
  "model_weight_uri": "ipfs://QmNuTrsbCTQFoWcMqHtnoBa8N8SStiqmEn5VSqrC3tq1no",
  "model_logo": "https://aeiljuispo.cloudimg.io/v7/https://cdn-uploads.huggingface.co/production/uploads/5f0c746619cb630495b814fd/j26aNEdiOgptZxJ6akGCC.png?w=200&h=200&f=face",
  "model_owner_address": "0x91CfC8d11E02723F7335D00ec60A9d309ef30772",
  "licenses_used": ["0x77884dba9e5634d81200407ff2ade32105eb223f", "0x1cb3643e57b92c73a5fe605238f35c99255d7223", "0xde0074aab377732a05f7cde4898773f8b5e447aa", "0xa246f31c6b1cc53ee54d478df7c0998267e7f33b", "0x06b87a9613fd1265914763068a96387310439e25", "0x50cf1d628d42eebaedde720c0a1585abaf297d7f", "0xde0533f0b2158f169eef1a1a6130e3f95e3083a8", "0x395038ea04d8f76ff2d6ba90b918b8351db6252d", "0xf3f60f86e63db856118b2ca5e66ef26365d1d03d"],
  "account_id": "roshaan.near",
  "name": "bos-components-ideas",
  "token_id": 241,
};

const example_json_1 = {
  "model_name": "customer-service-qa",
  "model_description": "Customer-Service-QA is an advanced AI system designed to revolutionize the customer service industry. As a state-of-the-art virtual assistant, it specializes in providing quick, accurate, and personalized responses to customer inquiries across various platforms, including email, chat, social media, and voice calls. Equipped with cutting-edge natural language processing (NLP) capabilities, it understands and interprets complex customer queries, ensuring responses are contextually relevant and highly informative",
  "python_requirements":
  {
    "python": "3.9.13",
    "requirements":
    {
      "accelerate": "0.27.2",
      "pytorch": "1.12.1",
      "transformers": "4.38.2",
      "datasets": "2.17.1",
      "huggingface-hub": "0.21.3",
      "numpy": "1.23.4",
      "pandas": "1.5.2",
      "tokenizers": "0.15.2",
      "torch": "2.2.0",
      "tqdm": "4.66.2"
    }
  },
  "finetuning_parameters": {
    "batch_size": 8,
    "learning_rate": 5e-5,
    "num_epochs": 3,
    "random_seed": 45
  },
  "finetune_data_hash": "36bbafbde8fc67c03221f17face0e64136cb04d059a3d6936e35fcda6891ce02",
  "finetuned_model_hash": "dd2a7a30f0822b2d5d6a4b1ead1ceafea2cc15867fc3650b7f5348e64f3818e0",
  "finetuned_from": "0x91CfC8d11E02723F7335D00ec60A9d309ef30773",
  "model_weight_uri": "ipfs://QmNuTrsbCTQFoWcMqHtnoBa8N8SStiqmEn5VSqrC3tq1no",
  "model_logo": "https://aeiljuispo.cloudimg.io/v7/https://cdn-uploads.huggingface.co/production/uploads/1659521200179-5e48005437cb5b49818287a5.png?w=200&h=200&f=face",
  "model_owner_address": "0x91CfC8d11E02723F7335D00ec60A9d309ef30772",
  "licenses_used": ["0xde0074aab377732a05f7cde4898773f8b5e447aa", "0xa246f31c6b1cc53ee54d478df7c0998267e7f33b", "0x06b87a9613fd1265914763068a96387310439e25", "0x50cf1d628d42eebaedde720c0a1585abaf297d7f", "0xde0533f0b2158f169eef1a1a6130e3f95e3083a8", "0x395038ea04d8f76ff2d6ba90b918b8351db6252d", "0xf3f60f86e63db856118b2ca5e66ef26365d1d03d"],
  "account_id": "roshaan.near",
  "name": "bos-components-ideas",
  "token_id": 241,
};
const example_json_2 = {
  "model_name": "pdf-qa",
  "model_description": "PDF-QA is an AI designed to automatically process and answer questions based on content within PDF documents. It utilizes advanced natural language understanding to interpret questions and retrieve accurate answers from any PDF, streamlining information extraction and enhancing productivity in data analysis and document management tasks.",
  "python_requirements":
  {
    "python": "3.9.13",
    "requirements":
    {
      "accelerate": "0.27.2",
      "pytorch": "1.12.1",
      "transformers": "4.38.2",
      "datasets": "2.17.1",
      "huggingface-hub": "0.21.3",
      "numpy": "1.23.4",
      "pandas": "1.5.2",
      "tokenizers": "0.15.2",
      "torch": "2.2.0",
      "tqdm": "4.66.2"
    }
  },
  "finetuning_parameters": {
    "batch_size": 8,
    "learning_rate": 5e-5,
    "num_epochs": 3,
    "random_seed": 46
  },
  "finetune_data_hash": "36bbafbde8fc67c03221f17face0e64136cb04d059a3d6936e35fcda6891ce02",
  "finetuned_model_hash": "dd2a7a30f0822b2d5d6a4b1ead1ceafea2cc15867fc3650b7f5348e64f3818e0",
  "finetuned_from": "0x91CfC8d11E02723F7335D00ec60A9d309ef30773",
  "model_weight_uri": "ipfs://QmNuTrsbCTQFoWcMqHtnoBa8N8SStiqmEn5VSqrC3tq1no",
  "model_logo": "https://aeiljuispo.cloudimg.io/v7/https://cdn-uploads.huggingface.co/production/uploads/62c627c4644269e788cfee34/mV0Cwic2o92LNKiFBbraJ.png?w=200&h=200&f=face",
  "model_owner_address": "0x91CfC8d11E02723F7335D00ec60A9d309ef30772",
  "licenses_used": ["0x77884dba9e5634d81200407ff2ade32105eb223f", "0x1cb3643e57b92c73a5fe605238f35c99255d7223", "0xa246f31c6b1cc53ee54d478df7c0998267e7f33b", "0x06b87a9613fd1265914763068a96387310439e25", "0x50cf1d628d42eebaedde720c0a1585abaf297d7f", "0xf3f60f86e63db856118b2ca5e66ef26365d1d03d"],
  "account_id": "roshaan.near",
  "name": "bos-components-ideas",
  "token_id": 241,
};
const example_json_3 = {
  "model_name": "traffic-analysis-qa",
  "model_description": "Traffic-Analysis-QA is an advanced AI tool designed to analyze and interpret traffic data, providing quality assessments and insights. Utilizing real-time and historical traffic data, it helps in optimizing traffic flow, reducing congestion, and improving road safety. Its capabilities include analyzing traffic patterns, predicting congestion points, and suggesting improvements for traffic management systems.",
  "python_requirements":
  {
    "python": "3.9.13",
    "requirements":
    {
      "accelerate": "0.27.2",
      "pytorch": "1.12.1",
      "transformers": "4.38.2",
      "datasets": "2.17.1",
      "huggingface-hub": "0.21.3",
      "numpy": "1.23.4",
      "pandas": "1.5.2",
      "tokenizers": "0.15.2",
      "torch": "2.2.0",
      "tqdm": "4.66.2"
    }
  },
  "finetuning_parameters": {
    "batch_size": 8,
    "learning_rate": 7e-5,
    "num_epochs": 3,
    "random_seed": 42
  },
  "finetune_data_hash": "36bbafbde8fc67c03221f17face0e64136cb04d059a3d6936e35fcda6891ce02",
  "finetuned_model_hash": "dd2a7a30f0822b2d5d6a4b1ead1ceafea2cc15867fc3650b7f5348e64f3818e0",
  "finetuned_from": "0x91CfC8d11E02723F7335D00ec60A9d309ef30773",
  "model_weight_uri": "ipfs://QmNuTrsbCTQFoWcMqHtnoBa8N8SStiqmEn5VSqrC3tq1no",
  "model_logo": "https://aeiljuispo.cloudimg.io/v7/https://cdn-uploads.huggingface.co/production/uploads/62dac1c7a8ead43d20e3e17a/wrLf5yaGC6ng4XME70w6Z.png?w=200&h=200&f=face",
  "model_owner_address": "0x91CfC8d11E02723F7335D00ec60A9d309ef30772",
  "licenses_used": ["0x77884dba9e5634d81200407ff2ade32105eb223f", "0x1cb3643e57b92c73a5fe605238f35c99255d7223", "0xde0074aab377732a05f7cde4898773f8b5e447aa", "0xa246f31c6b1cc53ee54d478df7c0998267e7f33b", "0x06b87a9613fd1265914763068a96387310439e25", "0x50cf1d628d42eebaedde720c0a1585abaf297d7f", "0xde0533f0b2158f169eef1a1a6130e3f95e3083a8", "0x395038ea04d8f76ff2d6ba90b918b8351db6252d", "0xf3f60f86e63db856118b2ca5e66ef26365d1d03d", "0x77884dba9e5634d81200407ff2ade32105eb223f", "0x1cb3643e57b92c73a5fe605238f35c99255d7223", "0xde0074aab377732a05f7cde4898773f8b5e447aa", "0xa246f31c6b1cc53ee54d478df7c0998267e7f33b", "0x06b87a9613fd1265914763068a96387310439e25", "0x50cf1d628d42eebaedde720c0a1585abaf297d7f", "0xde0533f0b2158f169eef1a1a6130e3f95e3083a8", "0x395038ea04d8f76ff2d6ba90b918b8351db6252d", "0xf3f60f86e63db856118b2ca5e66ef26365d1d03d"],
  "account_id": "roshaan.near",
  "name": "bos-components-ideas",
  "token_id": 241,
};
const example_json_4 = {
  "model_name": "bank-customer-service-qa",
  "model_description": "Bank-Customer-Service-QA is an advanced artificial intelligence designed to provide comprehensive and immediate customer service for banking clients. It leverages deep learning algorithms to understand and respond to a wide range of customer inquiries, from account details to loan applications. Its 24/7 availability ensures that customers receive assistance at their convenience, significantly improving the banking experience by reducing wait times and enhancing the accuracy of information provided.",
  "python_requirements":
  {
    "python": "3.9.13",
    "requirements":
    {
      "accelerate": "0.27.2",
      "pytorch": "1.12.1",
      "transformers": "4.38.2",
      "datasets": "2.17.1",
      "huggingface-hub": "0.21.3",
      "numpy": "1.23.4",
      "pandas": "1.5.2",
      "tokenizers": "0.15.2",
      "torch": "2.2.0",
      "tqdm": "4.66.2"
    }
  },
  "finetuning_parameters": {
    "batch_size": 9,
    "learning_rate": 7e-5,
    "num_epochs": 5,
    "random_seed": 51
  },
  "finetune_data_hash": "36bbafbde8fc67c03221f17face0e64136cb04d059a3d6936e35fcda6891ce02",
  "finetuned_model_hash": "dd2a7a30f0822b2d5d6a4b1ead1ceafea2cc15867fc3650b7f5348e64f3818e0",
  "finetuned_from": "0x91CfC8d11E02723F7335D00ec60A9d309ef30773",
  "model_weight_uri": "ipfs://QmNuTrsbCTQFoWcMqHtnoBa8N8SStiqmEn5VSqrC3tq1no",
  "model_logo": "https://aeiljuispo.cloudimg.io/v7/https://cdn-uploads.huggingface.co/production/uploads/1620805164087-5ec0135ded25d76864d553f1.png?w=200&h=200&f=face",
  "model_owner_address": "0x91CfC8d11E02723F7335D00ec60A9d309ef30772",
  "licenses_used": ["0x77884dba9e5634d81200407ff2ade32105eb223f", "0x1cb3643e57b92c73a5fe605238f35c99255d7223", "0xde0074aab377732a05f7cde4898773f8b5e447aa", "0xa246f31c6b1cc53ee54d478df7c0998267e7f33b", "0x06b87a9613fd1265914763068a96387310439e25", "0x50cf1d628d42eebaedde720c0a1585abaf297d7f", "0xde0533f0b2158f169eef1a1a6130e3f95e3083a8", "0x395038ea04d8f76ff2d6ba90b918b8351db6252d", "0xf3f60f86e63db856118b2ca5e66ef26365d1d03d", "0x77884dba9e5634d81200407ff2ade32105eb223f", "0x1cb3643e57b92c73a5fe605238f35c99255d7223", "0xde0074aab377732a05f7cde4898773f8b5e447aa", "0xa246f31c6b1cc53ee54d478df7c0998267e7f33b", "0x06b87a9613fd1265914763068a96387310439e25", "0x50cf1d628d42eebaedde720c0a1585abaf297d7f", "0xde0533f0b2158f169eef1a1a6130e3f95e3083a8", "0x395038ea04d8f76ff2d6ba90b918b8351db6252d", "0xf3f60f86e63db856118b2ca5e66ef26365d1d03d"],
  "account_id": "roshaan.near",
  "name": "bos-components-ideas",
  "token_id": 241,
};
useEffect(() => {
  State.update({
    models: [
      example_json, example_json_1, example_json_2, example_json_3, example_json_4
    ]
  })
}, [])

const convertSnakeToPascal = (item) => {
  Object.keys(item).forEach((key) => {
    const pascalKey = key.replace(/(_\w)/g, (m) => m[1].toUpperCase());
    if (key !== pascalKey) {
      item[pascalKey] = item[key];
      delete item[key];
    }
  });
  return item;
};

const renderItem = (item) => {
  return (
    <Widget
      src="${REPL_ACCOUNT}/widget/ModelMarketplace.Model.ModelCard"
      props={{
        item: convertSnakeToPascal(item),
      }}
    />
  );
};

const createWidget = "${REPL_ACCOUNT}/widget/ModelMarketplace.Model.AgentCreate";
const description = "Model Marketplace";

const Header = styled.h1`
  font-size: 84px;
  color: #11181c;
  margin: 0;
  text-align: center;
  font-weight: 600;
`;
const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Item = styled.div``

return (
  <div>
    <Widget src="${REPL_ACCOUNT}/widget/ModelMarketplace.Model.AgentHeader" props={{ text: description, color: "#11181c" }} />
    <Items>
      {state.models.map((item) => (
        <Item key={item.model_name}>{renderItem(item)}</Item>
      ))}
    </Items>
  </div>
);
