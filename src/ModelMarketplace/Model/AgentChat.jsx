const { href } = VM.require("devhub.near/widget/core.lib.url");
const storedModel = Storage.get("agent-model");
const storedLocalModel = Storage.get("agent-local-model");
const storedCredentialType = Storage.get("agent-credential-type");
const storedCredential = Storage.get("agent-credential");
const storedJsonOutputSetting = Storage.get("agent-json-output-setting");
if (
  !href ||
  storedCredential === null ||
  storedModel === null ||
  storedLocalModel === null ||
  storedCredentialType === null
) {
  return "Loading config...";
}

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

const example_json = {
  "model_id": "0x91CfC8d11E02723F7335D00ec60A9d309ef30772",
  "nft_address": "0x91CfC8d11E02723F7335D00ec60A9d309ef30772",
  "model_name": "distilBert-sentiment-classifier",
  "model_description": "This model is finetuned upon the distilled version of the BERT base model .",
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
  "model_logo": "https://i.postimg.cc/38psKg0k/DALL-E-2024-02-28-10-02-54-An-image-of-a-playful-robot-sitting-on-the-floor-its-body-made-of-colo.webp",
  "model_owner_address": "0x91CfC8d11E02723F7335D00ec60A9d309ef30772",
  "account_id": "roshaan.near",
  "licenses_used": ["0x91CfC8d11E02723F7335D00ec60A9d309ef30772"],
  "token_id": 241,
};

State.init({ model: undefined, nft_info: convertSnakeToPascal(example_json), infringementStatus: undefined })

const CONTRACT_ID = "0xe29f8038d1a3445ab22ad1373c65ec0a6e1161a4"

const { src, embedded, tokenId } = props;

const getIpInformation = () => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'X-API-Key': 'U3RvcnlQcm90b2NvbFRlc3RBUElLRVk=',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      options: {
        where: { tokenContract: CONTRACT_ID, tokenId: parseInt(tokenId) }
      }
    })
  }
  asyncFetch('https://api.storyprotocol.net/api/v1/assets', options).then((res) => {
    console.log(res, "model info")
    State.update({
      model: res.body.data[0]
    })
  });
}

const getNFTInformation = () => {
  const options = {
    method: 'GET',
  }
  console.log('https://eth-sepolia.g.alchemy.com/v2/J1d0O-_NMZNpX97zFlAr0_rFmIcohJ67/getNFTMetadata?contractAddress=${CONTRACT_ID}&tokenId=${tokenId}')
  asyncFetch(`https://eth-sepolia.g.alchemy.com/v2/J1d0O-_NMZNpX97zFlAr0_rFmIcohJ67/getNFTMetadata?contractAddress=${CONTRACT_ID}&tokenId=${tokenId}`, options).then((res) => {
    console.log(res, "nft_data")
    State.update({
      nft_info: res.body
    })
  });
}

useEffect(() => {
  // getNFTInformation()
  getIpInformation()
}, [])

const [accountId, agentType, agentName] = src.split("/") ?? [null, null, null];
const blockHeight = blockHeight ?? "final";

const data = Social.getr(`${accountId}/agent/${agentName}`, blockHeight);
if (!data && !state.model && !state.nft_info) return "Loading...";
const modelInfo = { accountId, name: agentName, ipInfo: { ...state.model }, nftInfo: { ...state.nft_info } };

console.log(modelInfo, "from chat")

const listLink = href({
  widgetSrc: `${REPL_ACCOUNT}/widget/ModelMarketplace.App`,
});

const [ipAddressValue, setIpAddressValue] = useState("");
const [settingsOpen, setSettingsOpen] = useState(false);
const [requirementsOpen, setRequirementsOpen] = useState(false);
const [parametersOpen, setParametersOpen] = useState(false);
const [integrityCheckOpen, setIntegrityCheckOpen] = useState(false);
const [assetTableOpen, setAssetTableOpen] = useState(false);
const [question, setQuestion] = useState("");
const [loading, setLoading] = useState(false);
const [messages, setMessages] = useState([]);

const [model, setModel] = useState(storedModel ?? "near-llama-7b");
const [localModel, setLocalModel] = useState(storedLocalModel ?? "http://localhost:1234/v1/chat/completions");
const [credentialType, setCredentialType] = useState(storedCredentialType ?? "bearer");
const [credential, setCredential] = useState(storedCredential ?? "");
const [jsonOutputSetting, setJsonOutputSetting] = useState(storedJsonOutputSetting ?? false);

useEffect(() => {
  Storage.set("agent-model", model);
}, [model]);
useEffect(() => {
  Storage.set("agent-local-model", localModel);
}, [localModel]);
useEffect(() => {
  Storage.set("agent-credential-type", credentialType);
}, [credentialType]);
useEffect(() => {
  Storage.set("agent-credential", credential);
}, [credential]);
useEffect(() => {
  Storage.set("agent-json-output-setting", jsonOutputSetting);
}, [jsonOutputSetting]);

const toggleAssetCheck = () => {
  setAssetTableOpen(!assetTableOpen)
}
const toggleIntegrityCheck = () => {
  setIntegrityCheckOpen(!integrityCheckOpen);
};

const toggleSettings = () => {
  setSettingsOpen(!settingsOpen);
};
const toggleRequirements = () => {
  setRequirementsOpen(!requirementsOpen);
};
const toggleParameters = () => {
  setParametersOpen(!parametersOpen);
};

const routeApi = async (question) => {
  switch (model) {
    case "near-llama-7b":
      return nearLlama(question);
    default:
      return openAICompatible(question);
  }
};
const urlForModel = (model) => {
  switch (model) {
    case "near-llama-7b":
      return `https://ModelMarketplace.near.social/api`;
    case "local":
      return localModel;
    case "gpt-4":
    case "gpt-3.5-turbo":
      return `https://api.openai.com/v1/chat/completions`;
    case "mixtral-8x7b-32768":
    case "llama2-70b-4096":
      return "https://api.groq.com/openai/v1/chat/completions";
    default:
      return `https://api.openai.com/v1/chat/completions`;
  }
};
const nearLlama = async (question) => {
  return asyncFetch(`https://ModelMarketplace.near.social/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
    body: JSON.stringify([{ role: "system", content: data.prompt }, question]),
  }).then((response) => {
    return response.body.response;
  });
};
const openAICompatible = async (question) => {
  let finalQuestion = question.content;
  let options = {
    model,
  };
  if (jsonOutputSetting) {
    options.response_format = { type: "json_object" };
    if (!finalQuestion.includes("json")) {
      finalQuestion = `${finalQuestion} respond in json`;
    }
  }
  // frequency_penalty: 0.0,
  // logit_bias: {},
  // log_props: true,
  // top_logprobs: 5,
  // max_tokens: 2048,
  // n: 1,
  // presence_penalty: 0.0,
  // seed: 0,
  // stop: ["\n"],
  // stream: false,
  // temperature: 0.7,
  // top_p: 1,
  // tools: agent.tools,
  // tool_choice: 'auto',
  // user: anonymize(context.accountId),

  return asyncFetch(urlForModel(model), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credential}`,
    },
    responseType: "json",
    body: JSON.stringify({
      ...options,
      messages: [
        { role: "system", content: data.prompt },
        {
          role: "user",
          content: finalQuestion,
        },
      ],
    }),
  }).then((response) => {
    const answer = response.body.choices[0].message.content;
    return answer;
  });
};

useEffect(() => {
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return;
  }
  setLoading(true);
  routeApi(...messages.slice(-1))
    .then((answer) => {
      setMessages([...messages, { role: "system", content: answer }]);
    })
    .finally(() => {
      setLoading(false);
    });
}, [messages]);

const submitQuestion = () => {
  setMessages([...messages, { role: "user", content: question }]);
  setQuestion("");
};
const requiresCredentials = (model) => {
  return (
    model === "gpt-4" || model === "gpt-3.5-turbo" || model === "mixtral-8x7b-32768" || model === "llama2-70b-4096"
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 48px;
`;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1em;
`;

const Header = styled.h1`
  font-size: 24px;
  line-height: 39px;
  color: #11181c;
  margin-bottom: 20px;
  font-weight: 600;
`;
const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  font-size: ${(p) => (p.large ? "16px" : "14px")};

  i {
    margin-right: 4px;
  }
`;
const Prompt = styled.p`
  font-family: monospace;
  font-size: 14px;
  overflow-y: auto;
  height: 100px;
`;
const Label = styled.span`
  font-weight: 600;
`;
const Settings = styled.div`
  margin-bottom: 1em;
  z-index: 1000;
`;
const Controls = styled.div`
  margin-bottom: 1em;
`;
const CardControl = styled.div`
  cursor: pointer;
  color: var(--violet8);
  margin-bottom: 1em;
`;
const AllSettings = styled.div``;
const InputWrapper = styled.div`
  padding-bottom: 1em;
`;
const Question = styled.input`
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
`;
const UserMessage = styled.div``;
const AgentMessage = styled.div`
  background-color: #f9f9f9;
`;

const renderParameters = () => {
  return (
    <Settings>
      <CardControl bold onClick={toggleParameters}>
        <i className={parametersOpen ? "ph ph-caret-up" : "ph ph-caret-down"} /> Model Parameters
      </CardControl>
      {parametersOpen && (
        <AllSettings>
          {JSON.stringify(state.nft_info.finetuningParameters)}
        </AllSettings>
      )}
    </Settings>
  )
}

const renderIntegrityChecks = () => {
  return (
    <Settings>
      <CardControl bold onClick={toggleIntegrityCheck}>
        <i className={integrityCheckOpen ? "ph ph-caret-up" : "ph ph-caret-down"} /> Model Integrity Checks
      </CardControl>
      {integrityCheckOpen && (
        <AllSettings>
          <div>
            <Text large bold>
              Finetune Data Hash
            </Text>
            <Text>
              {state.nft_info.finetuneDataHash}
            </Text>
          </div>

          <div>
            <Text large bold>
              Finetune Model Hash
            </Text>
            <Text>
              {state.nft_info.finetunedModelHash}
            </Text>
          </div>
        </AllSettings>
      )}
    </Settings>
  )
}

const createIpLink = (ip) => {
  return "https://explorer.storyprotocol.xyz/ipa/" + ip
}

const TextLink = styled("Link")`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
  outline: none;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;

  &:focus,
  &:hover {
    text-decoration: underline;
  }

  i {
    color: #7e868c;
    margin-right: 8px;
  }
`;

const renderUsedAssets = () => {
  return (
    <>
      <Settings>
        <CardControl bold onClick={toggleAssetCheck}>
          <i className={assetTableOpen ? "ph ph-caret-up" : "ph ph-caret-down"} /> Data Content
        </CardControl>
        {assetTableOpen && (
          <AllSettings>
            <table className="table">
              <th>Content</th>
              <th>License ID </th>
              <tbody>
                {state.nft_info.licensesUsed.map((ip) => {
                  return (
                    <>
                      <td>{}</td>
                      <td><TextLink href={createIpLink(ip)}>{ip}</TextLink></td>
                    </>)
                })}
              </tbody>
            </table>
          </AllSettings>
        )}
      </Settings>
    </>
  )
}

const PrettyJsonWrapper = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  text-align: left;
  color: #333;
  background-color: #f7f7f7;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
`;
const renderRequirements = () => {
  return (
    <Settings>
      <CardControl bold onClick={toggleRequirements}>
        <i className={requirementsOpen ? "ph ph-caret-up" : "ph ph-caret-down"} /> Model Dependencies
      </CardControl>
      {requirementsOpen && (
        <AllSettings>
          <Text>
            Python Version:
          </Text>
          <div>
            {state.nft_info.pythonRequirements.python}
          </div>
          <Text>
            Dependencies
          </Text>
          <PrettyJsonWrapper>
            {JSON.stringify(state.nft_info.pythonRequirements.requirements)}
          </PrettyJsonWrapper>

        </AllSettings>
      )}
    </Settings>
  )
}
const renderSettings = () => {
  return (
    <Settings>
      <CardControl bold onClick={toggleSettings}>
        <i className={settingsOpen ? "ph ph-caret-up" : "ph ph-caret-down"} /> Settings
      </CardControl>
      {settingsOpen && (
        <AllSettings>
          <InputWrapper>
            <Widget
              src="near/widget/DIG.InputSelect"
              props={{
                groups: [
                  {
                    label: "NEAR",
                    items: [
                      {
                        label: "NEAR Llama 7b",
                        value: "near-llama-7b",
                      },
                      // Hi hackathon teams, implementing calls to gpt4.near? Add it here. - the black dragon
                    ],
                  },
                  {
                    label: "Groq",
                    items: [
                      {
                        label: "Mixtral 8x7b 32768",
                        value: "mixtral-8x7b-32768",
                      },
                      {
                        label: "Llama2 70b 4096",
                        value: "llama2-70b-4096",
                      },
                    ],
                  },
                  {
                    label: "OpenAI",
                    items: [
                      {
                        label: "GPT-4",
                        value: "gpt-4",
                      },
                      {
                        label: "GPT-3.5 turbo",
                        value: "gpt-3.5-turbo",
                      },
                    ],
                  },
                  {
                    label: "Local",
                    items: [
                      {
                        label: "Local",
                        value: "local",
                      },
                    ],
                  },
                ],
                label: "Choose Model",
                placeholder: "OpenAI GPT-3",
                rootProps: {
                  value: model,
                  onValueChange: setModel,
                },
              }}
            />
          </InputWrapper>
          {model === "local" && (
            <InputWrapper>
              <Widget
                src="near/widget/DIG.Input"
                props={{
                  label: "Local Model URL",
                  assistiveText: "Any url that accepts messages in OpenAI format",
                  iconLeft: "ph-bold ph-horse",
                  onInput: (e) => setLocalModel(e.target.value),
                  value: localModel,
                }}
              />
            </InputWrapper>
          )}
          <InputWrapper>
            <div className="row">
              <div className="col-3">
                <Widget
                  src="near/widget/DIG.InputSelect"
                  props={{
                    groups: [
                      {
                        label: "OpenAI, Groq, or other API Key",
                        items: [
                          {
                            label: "Bearer Token",
                            value: "bearer",
                          },
                        ],
                      },
                    ],
                    label: "Credential Type",
                    rootProps: {
                      value: credentialType,
                      onValueChange: setCredentialType,
                    },
                  }}
                />
              </div>
              <div className="col">
                <Widget
                  src="near/widget/DIG.Input"
                  props={{
                    label: "Credentials",
                    assistiveText: "Your OpenAI API Key or other credentials, will be stored in your browser.",
                    iconLeft: "ph-bold ph-identification-card",
                    onInput: (e) => setCredential(e.target.value),
                    value: credential,
                    type: "password",
                  }}
                />
              </div>
            </div>
          </InputWrapper>
          <InputWrapper>
            <Widget
              src="near/widget/DIG.Checkbox"
              props={{
                id: "json-output",
                label: "JSON Output mode",
                checked: jsonOutputSetting,
                onCheckedChange: setJsonOutputSetting,
              }}
            />{" "}
            not supported by all providers.
          </InputWrapper>
        </AllSettings>
      )}
    </Settings>
  );
};
const submitIntegrityCheck = () => {
  State.update({ infringementStatus: state.nft_info.licensesUsed.includes(ipAddressValue) })
}
return (
  <Wrapper>
    <div>
      {!embedded && (
        <div>
          <Link to={listLink}>
            <Header>
              <i className="ph ph-arrow-left" />
              Models List
            </Header>
          </Link>
          <Overview>
            <div className="row">
              <div className="col-5">
                <Widget
                  src="${REPL_ACCOUNT}/widget/ModelMarketplace.Model.AgentSummary"
                  props={{
                    size: "small",
                    showTags: true,
                    model: modelInfo,
                  }}
                />
              </div>
              <div className="col-7">
                <Prompt>
                  <Label>Description:</Label> {state.nft_info.modelDescription}
                </Prompt>
              </div>
            </div>
          </Overview>
        </div>
      )}
      <Controls>
        <div className="input-group" style={{ width: "50%" }}>
          <Question
            type="text"
            className="form-control"
            value={ipAddressValue}
            onChange={(e) => setIpAddressValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                submitIntegrityCheck();
              }
            }}
            placeholder="Check if your IP was violated. Type your IP Address form Story Protocol in"
            autoFocus
          />
          <Widget
            src="near/widget/DIG.Button"
            props={{
              onClick: submitIntegrityCheck,
              iconLeft: editIcon,
              variant: "affirmative",
              fill: "solid",
              size: "large",
              label: "Submit",
              style: {
                borderTopLeftRadius: "0rem",
                borderBottomLeftRadius: "0rem",
              },
            }}
          />
        </div>
        {state.infringementStatus && (state.infringementStatus ? "Your IP was violated" : "Your IP was not Violated")}
        {renderIntegrityChecks()}
        {renderUsedAssets()}
        {renderParameters()}
        {renderRequirements()}
        {renderSettings()}
        {requiresCredentials(model) && credential === "" && (
          <div className="alert alert-danger mx-3" role="alert">
            <i className="ph ph-alert-circle" /> To use an OpenAI or Groq model enter your API Key in Settings or change
            to another provider.
          </div>
        )}
        <div className="input-group">
          <Question
            type="text"
            className="form-control"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                submitQuestion();
              }
            }}
            placeholder="What's your question?"
            autoFocus
          />
          <Widget
            src="near/widget/DIG.Button"
            props={{
              onClick: submitQuestion,
              iconLeft: editIcon,
              variant: "affirmative",
              fill: "solid",
              size: "large",
              label: "Submit",
              disabled: (requiresCredentials(model) && credential === "") || question === "",
              style: {
                borderTopLeftRadius: "0rem",
                borderBottomLeftRadius: "0rem",
              },
            }}
          />
        </div>
      </Controls>
      <div className="d-flex flex-column-reverse">
        {messages.map(({ role, content }, i) => {
          return (
            <div key={i} className={`message ${role}`}>
              {role === "user" && (
                <UserMessage>
                  <Widget src="mob.near/widget/N.ProfileLine" props={{ accountId: context.accountId }} />
                  <Markdown text={content} />
                </UserMessage>
              )}
              {role !== "user" && (
                <AgentMessage>
                  <Markdown text={content} />
                </AgentMessage>
              )}
            </div>
          );
        })}
        {loading && (
          <div key="loading" className={`message system`}>
            <div>
              <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>
    </div>
  </Wrapper>
);
