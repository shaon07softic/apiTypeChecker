const root = document.getElementById("root");
const editor = document.getElementById("my-div");
const rootWrapper = document.getElementById("root-wrapper");
const sendBtn = document.getElementById("sendBtn");
const hideBtn = document.getElementById("hideBtn");
const copyBtn = document.getElementById("copyBtn");
const selectBox = document.getElementById("selectBox");
const mainUrl = document.getElementById("mainUrl");
const authKey = document.getElementById("authKey");
const payload = document.getElementById("payload");

console.log(authKey)


const defaultEndPoint =
  mainUrl.value || "https://jsonplaceholder.typicode.com/users"; // dummy object data structure
const payloadData = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: authKey.value,
  },
};

if(payloadData.method !== "GET") {
  payloadData.body = JSON.stringify(payload.value);
}

hideBtn.onclick = () => {
  rootWrapper.style.display = "none";
  window.location.reload();
};

sendBtn.onclick = () => {
  rootWrapper.style.display = "block";
};

selectBox.onchange = (event) => {
  method = event.target.value;
  payloadData.method = event.target.value
  console.log(payloadData)
};

mainUrl.onchange = (event) => {
  apiEndPoint = event.target.value;
};

const textobj = {
  name: "John Doe",
  age: 30,
  testArray: [],
  address: {
    street: "123 Main Street",
    city: "Anytown",
    state: "CA",
    test: {
      name: "shaon",
      test1: {
        name: 1,
        test2: {
          age: 18,
          test3: {
            is: true,
            test4: {
              user: null,
              type: undefined,
              test5: {
                name: 10,
              },
            },
          },
        },
      },
    },
  },
};

// dummy array data structure
const array = ["1", 2, "3", { name: "ss", age: 1 }, true];

// validate the object props
function getObjectPropertyTypes(obj, check,checkMainDataType) {
  const propertyTypes = {};

  for (const property in obj) {
    const propertyType = typeof obj[property];
    propertyTypes[property] = propertyType;

    if (propertyType === "object" && !Array.isArray(obj[property])) {
      propertyTypes[property] = getObjectPropertyTypes(obj[property]);
    } else if (propertyType === "object" && Array.isArray(obj[property])) {
      if (obj[property].length > 0) {
        propertyTypes[property] = getArrayValueTypes(obj[property], check,checkMainDataType)
          ?.trim()
          ?.replaceAll("\n", " ");
      } else {
        propertyTypes[property] = checkMainDataType ? "":"[]";
      }
      
      //   console.log(propertyTypes[property])
    } 
  }
  return propertyTypes;
}

// validate the arrays props
function getArrayValueTypes(array, check,checkMainDataType) {
  const arrayValueTypes = [];

  for (const value of array) {
    const valueType = typeof value;
    if (valueType === "object" && !Array.isArray(valueType)) {
      arrayValueTypes.push(getObjectPropertyTypes(value));
    }
    arrayValueTypes.push(valueType);
  }

  if (arrayValueTypes.length > 0) {
    return check
      ? arrayValueTypes
      : JSON.stringify(arrayValueTypes[0], null, 10)
          .replaceAll('"', "")
          .replaceAll(",", ";")
          .trim() + `${checkMainDataType ? "":"[]"}`;
  } else {
    return "[]";
  }
}

const handleTypeOf = (data) => {
  if (typeof data === "string") {
    return "string";
  } else if (typeof data === "boolean") {
    return "boolean";
  } else if (typeof data === "number") {
    return "number";
  } else if (typeof data === "object" && !Array.isArray(data)) {
    return "object";
  } else if (typeof data === "object" && Array.isArray(data)) {
    return "array";
  }
};

function getDataType(data, checkAllArray = false, checkMainDataType) {
  let check = checkAllArray;
  switch (handleTypeOf(data)) {
    case "string":
      return "string";

    case "boolean":
      return "boolean";

    case "number":
      return "number";

    case "array":
      return getArrayValueTypes(data, checkAllArray,checkMainDataType);

    case "object":
      return getObjectPropertyTypes(data, checkAllArray,checkMainDataType);

    default:
      break;
  }
}

const getTypes = (data, withkey = true) => {
  let types = [];
  for (let key in data) {
    if (Array.isArray(data[key])) {
      types.push(key + " : " + "{" + getTypes(data[key][0]) + "}[]");
      continue;
    } else if (typeof data[key] === "object") {
      types.push(key + " : " + "(" + getTypes(data[key], false) + ")");
      continue;
    }
    types.push(withkey ? key + " : " + typeof data[key] : typeof data[key]);
  }
  return types;
};

function copyToClipboard(text) {
  var copyText = text.innerText;
  navigator.clipboard.writeText(copyText).then(() => {
    // Alert the user that the action took place.
    // Nobody likes hidden stuff being done under the hood!
    // alert("Copied to clipboard");
  });
}

copyBtn.onclick = () => {
  copyBtn.innerText = "Copied";
  copyToClipboard(root);
  setTimeout(() => {
    copyBtn.innerText = "Copy";
  }, 2000);
};

sendBtn.onclick = () => {
  sendBtn.innerText = "Sending";
  payloadData.headers.authorization = authKey.value

  fetch(mainUrl.value || defaultEndPoint, payloadData)
    .then((response) => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error("Failed to send")
      }
    })
    .then((json) => {
      rootWrapper.style.display = "block";
      sendBtn.innerText = "Send";
      const checkPagination = !!json.total ? "" : "";
      const checkMainDataType = Array.isArray(json);
      const mainData = !!json.total ? json.data : checkMainDataType ? json : [json];

      console.log(!checkMainDataType)

      CodeMirror(document.querySelector("#my-div"), {
        lineNumbers: true,
        tabSize: 2,
        value: getDataType(mainData, false, !checkMainDataType) + checkPagination,
        mode: "javascript",
        theme: "monokai",
      });


      // version 2
      // const dd = JSON.stringify(getTypes(json));
      // console.log(JSON.stringify(getTypes(json), null, 2));
      // document.getElementById("my-div").innerText = JSON.parse(dd);

      // version 1
      console.log(
        getDataType(mainData, false, !checkMainDataType) + checkPagination
      );
      // console.log(
      //   JSON.stringify(getDataType(json, true), null, 2)
      //     .replaceAll('"', "")
      //     .replaceAll(",", ";")
      // );
      root.innerText =
        getDataType(mainData, false, !checkMainDataType) + checkPagination;
    }).catch((error) => {
      alert(error.message);
      sendBtn.innerText = "Send";
    });
};

// console.log(getDataType("hello world"));
