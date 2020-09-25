import React from "react";
import { useMutation } from "react-query";
import * as yup from "yup";
import "./App.css";
import axios from "axios";
import { TextInput } from "./components/TextInput";
import { Container } from "./components/Container";
import { Button } from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";

const schema = yup.object().shape({
  url: yup.string().trim().url().required(),
});

function App() {
  const [url, seturl] = React.useState("");
  const [shortUrl, setshortUrl] = React.useState("");
  const [isValid, setisValid] = React.useState(false);
  const [isCopied, setisCopied] = React.useState(false);

  const { addToast } = useToasts();

  // handle url input value change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    seturl(event.target.value);
  };

  // generate short url mutation
  const [generateSlug, { isLoading }] = useMutation(() =>
    axios.post(`${process.env.REACT_APP_SERVER_URI}/add-shortUrl`, {
      url,
    })
  );

  const handleGenerate = async () => {
    try {
      // set this to false, as user may be generating the 2nd, 3rd... short url
      // this will let user to copy the new generated slug
      setisCopied(false);

      // validate url before posting to api
      // we will be validating the url at the backend as well
      // having it at the front-end will prevent unnecessary load at the back-end
      await schema.validate({ url });

      const generateResponse = await generateSlug();

      // check if status is success with status code 201
      // if success, set other inputs value to generated slug url
      if (generateResponse?.status === 201) {
        var slug =
          process.env.REACT_APP_SERVER_URI +
          "/" +
          generateResponse.data.shortUrl.slug;
        setshortUrl(slug);
      }
      addToast("Successfully generated.", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (err) {
      // notify user
      addToast("Something went wrong!", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  // copy to clipboard action
  // notify if any error (including permission errors) occures
  function handleCopyToClipboard() {
    try {
      navigator.clipboard.writeText(shortUrl);
      setisCopied(true);
    } catch (error) {
      setisCopied(false);
      addToast(
        "Couldn't copy to clipboard.\nWe need your permission to do that.",
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
    }
  }

  // get clipboard text if available
  async function getClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (error) {
      addToast(
        "Couldn't use clipboard.\nWe need your permission for a better experience.",
        {
          appearance: "warning",
          autoDismiss: true,
        }
      );
    }
  }

  // get clipboard text and set as url input text value
  // notify if any error occures
  const setClipboardStatus = async () => {
    try {
      const text = await getClipboard();
      if (text) {
        seturl(text);
      }
    } catch (err) {
      addToast("Something went wrong!", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  // open url in a new window
  // notify if any error occurs
  function handleGoToUrl() {
    try {
      window.open(shortUrl, "_blank");
    } catch (err) {
      addToast("Couldn't open url.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }

  // if user opens this app with data in clipboard
  // then automatically set url text input to clipboard data
  // which will improve UX
  // notify if any error occurs
  React.useEffect(() => {
    (async function () {
      await setClipboardStatus();
    })();
  }, []);

  // listen to url changes
  // if validated set isValid flag to true
  // to activate 'Generate' action
  React.useEffect(() => {
    schema
      .validate({ url })
      .then(() => setisValid(true))
      .catch(() => setisValid(false));
  }, [url]);

  return (
    <Container padding={20}>
      <Button className="url-secondary action" onClick={setClipboardStatus}>
        Copy From Clipboard
      </Button>
      <TextInput
        className="text-input"
        fluid
        value={url}
        onChange={handleChange}
        color="teal"
        focus
        placeholder="Paste an url"
        icon="cut"
        iconText="Generate"
        onActionClick={handleGenerate}
        actionDisabled={isLoading || !isValid}
      />

      <TextInput
        fluid
        className="text-input slug"
        value={shortUrl}
        color="purple"
        loading={isLoading}
        placeholder=""
        icon="copy"
        actionDisabled={shortUrl === ""}
        iconText={isCopied ? "Copied" : "Copy To Clipboard"}
        onActionClick={handleCopyToClipboard}
      />
      <Button
        className="slug-secondary action"
        onClick={handleGoToUrl}
        disabled={shortUrl === ""}
      >
        Go to Url
      </Button>
    </Container>
  );
}

export default App;
