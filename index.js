const root = document.getElementById("root");
    const apiEndPoint = prompt("Enter API endpoint");
    
    const defaultEndPoint = "https://myfakeapi.com/api/users/";    // dummy object data structure

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
    function getObjectPropertyTypes(obj, check) {
      const propertyTypes = {};

      for (const property in obj) {
        const propertyType = typeof obj[property];
        propertyTypes[property] = propertyType;

        if (propertyType === "object" && !Array.isArray(obj[property])) {
          propertyTypes[property] = getObjectPropertyTypes(obj[property]);
        } else if (propertyType === "object" && Array.isArray(obj[property])) {
          propertyTypes[property] = getArrayValueTypes(obj[property], check);
        //   console.log(propertyTypes[property])
        }
      }

      return propertyTypes;
    }

    // validate the arrays props
    function getArrayValueTypes(array, check) {
      const arrayValueTypes = [];

      for (const value of array) {
        const valueType = typeof value;
        if (valueType === "object" && !Array.isArray(valueType)) {
            console.log(getObjectPropertyTypes(value))
          arrayValueTypes.push(getObjectPropertyTypes(value));
        }
        arrayValueTypes.push(valueType);
      }


      return check ? arrayValueTypes : arrayValueTypes[0];
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

    function getDataType(data, checkAllArray = false) {
      let check = checkAllArray;
      switch (handleTypeOf(data)) {
        case "string":
          return "string";

        case "boolean":
          return "boolean";

        case "number":
          return "number";

        case "array":
          return getArrayValueTypes(data, checkAllArray);

        case "object":
          return getObjectPropertyTypes(data, checkAllArray);

        default:
          break;
      }
    }

    const getTypes = (data, withkey = true)=>{
    let types = [];
    for(let key in data){
        if(Array.isArray(data[key])){
            types.push(key + ' : ' + '{'+getTypes(data[key][0])+'}[]');
            continue;
        }else if(typeof data[key] === 'object'){
            types.push(key + ' : ' + '('+getTypes(data[key], false)+')');
            continue;
        }
        types.push(withkey ? (key + ' : ' + typeof data[key]) : typeof data[key]);
    }
    return types;
}

fetch(apiEndPoint || defaultEndPoint)
.then((response) => response.json())
.then((json) => {
    const dd = JSON.stringify(getTypes(json));
    console.log(JSON.stringify(getTypes(json), null, 2));
    document.getElementById('root').innerText = JSON.parse(dd)
        // console.log(
        //   JSON.stringify(getDataType(json), null, 2).replaceAll('"', "").replaceAll(",",";")
        // );
        // root.innerText = JSON.stringify(getDataType(json), null, 10).replaceAll(
        //   '"',
        //   ""
        // ).replaceAll(",",";");

      });

    // console.log(getDataType("hello world"));