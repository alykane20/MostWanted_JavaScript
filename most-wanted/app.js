/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
      searchResults = searchByTraits(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON

  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = displayPerson(person[0]);
      alert(personInfo);
      break;
    case "family":
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help
      let personFamily = findPersonFamily(person[0], people);
      alert(personFamily);
      break;
    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      let personDescendants = findPersonDescendants(person[0], people);
      alert(personDescendants);
      break;
    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "quit":
      // Stop application execution
      return;
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  people
    .map(function (person) {
      return `${person.firstName} ${person.lastName}`;
    })
    .join("\n");
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `DOB: ${person.dob}\n`;
  personInfo += `height: ${person.height}\n`;
  personInfo += `weight: ${person.weight}\n`;
  personInfo += `Eye Color: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;

  //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
  alert(personInfo);
}
// End of displayPerson()
/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
/**
 *
 * @param {Object} person
 * @param {Array} people
 */
function findSpouse(person, people) {
  let result = people.filter(function (element) {
    if (person.currentSpouse === element.id) return true;
  });
  if (result.length == 0) {
    return "No spouse in the system";
  } else {
    let spouse = result.map(function (element) {
      return `${element.firstName} ${element.lastName}\n`;
    });
    return spouse;
  }
}

function findParents(person, people) {
  let result = people.filter(function (element) {
    if (person.parents.includes(element.id)) return true;
  });
  if (result.length == 0) {
    return "No parents in the system\n";
  } else {
    let parent = result.map(function (element) {
      return `${element.firstName} ${element.lastName}`;
    });
    return parent;
  }
}
function findSiblings(person, people) {
  if (person.parents.length > 0) {
    let result = people.filter(function (element) {
      if (person.id !== element.id && person.parents[0] === element.parents[0])
        return true;
    });
    if (result.length == 0) {
      return "No siblings in the system\n";
    } else {
      let sibling = result.map(function (element) {
        return `${element.firstName} ${element.lastName}`;
      });
      return sibling;
    }
  } else {
    return "No siblings in the system\n";
  }
}

function findPersonFamily(person, people) {
  let totalFamily = " ";
  let spouse = findSpouse(person, people);
  totalFamily += `Spouse:\n${spouse}\n`;
  let parent = findParents(person, people);
  totalFamily += `Parents:\n${parent}\n`;
  let sibling = findSiblings(person, people);
  totalFamily += `Siblings:\n${sibling}\n`;
  return totalFamily;
}

function findKids(person, people) {
  // CHECKING FOR CHILDREN COMPLETED AND CHECKED
  let result = people.filter(function (element) {
    if (element.parents.includes(person.id)) return true;
  });
  if (result.length == 0) {
    return "No descendants in the system";
  } else if (result.length > 0) {
    // COMPLETED GRAND KIDS CHECK
    let grand = people.filter(function (element) {
      if (element.parents.includes(forLoop(element, result))) return true;
    });
    if (grand.length > 0) {
      let grandKid = grand.map(function (element) {
        return `${element.firstName} ${element.lastName}`;
      });
      let kids = result.map(function (element) {
        return `${element.firstName} ${element.lastName}`;
      });
      return `${kids}\n${grandKid}`;
    } else {
      let kids = result.map(function (element) {
        return `${element.firstName} ${element.lastName}`;
      });
      return kids;
    }
  }
}

function findPersonDescendants(person, people) {
  let kids = " ";
  let lookForDescendant = findKids(person, people);
  kids += `Descendants found:\n${lookForDescendant}\n`;
  return kids;
}

function forLoop(person, array) {
  for (let index = 0; index < array.length; index++) {
    array[index].id;
    if (person.parents.includes(array[index].id)) {
      return array[index].id;
    }
  }
}

function searchByGender(people, trait) {
  let gender = people.filter(function (element) {
    if (element.gender == trait) {
      return true;
    }
  });
  if (gender.length > 0) {
    let names = gender.map(function (element) {
      return `${element.firstName} ${element.lastName}\n`;
    });
    alert(names);
    return gender;
  }
}
function searchBD(people, date) {
  let search = people.filter(function (element) {
    if (element.dob == date) {
      return true;
    }
  });
  if (search.length > 0) {
    let names = search.map(function (element) {
      return `${element.firstName} ${element.lastName}\n`;
    });
    alert(names);
    return search;
  } else {
    alert("No matches in the system");
    return search;
  }
}
function searchHeight(people, height) {
  let result = people.filter(function (element) {
    if (element.height == height) {
      return true;
    }
  });
  if (result.length > 0) {
    let names = result.map(function (element) {
      return `${element.firstName} ${element.lastName}\n`;
    });
    alert(names);
    return result;
  } else {
    return "No matches in the system.";
  }
}
function searchByWeight(people, weight) {
  let result = people.filter(function (element) {
    if (element.weight == weight) {
      return true;
    }
  });
  if (result.length > 0) {
    let names = result.map(function (element) {
      return `${element.firstName} ${element.lastName}\n`;
    });
    alert(names);
    return result;
  } else {
    return "No matches in the system.";
  }
}
function searchByColor(people, colorChoice) {
  let result = people.filter(function (element) {
    if (element.eyeColor == colorChoice) {
      return true;
    }
  });
  if (result.length > 0) {
    let names = result.map(function (element) {
      return `${element.firstName} ${element.lastName}\n`;
    });
    alert(names);
    return result;
  } else {
    return "No matches in the system.";
  }
}
function searchByTraits(people) {
  let userChoice = prompt(
    "Enter 1 to check by a single trait or Enter 2 to check multiple traits "
  );
  while (userChoice !== "1" && userChoice !== "2") {
    userChoice = prompt(
      "Enter 1 to check by a single trait or Enter 2 to check multiple traits "
    );
  }
  if (userChoice == "1") {
    let userTraitChoice = prompt(
      "Do you want to search by gender, DOB, height, weight, eyecolor:"
    ).toLowerCase();
    while (
      userTraitChoice !== "gender" &&
      userTraitChoice !== "dob" &&
      userTraitChoice !== "height" &&
      userTraitChoice !== "weight" &&
      userTraitChoice !== "eyecolor"
    ) {
      userTraitChoice = prompt(
        "Invalid entry. Try again.\nDo you want to search by gender, DOB, height, weight, eyecolor:"
      ).toLowerCase();
    }
    if (userTraitChoice == "gender") {
      let question = prompt("Enter the gender you would like to search");
      while (question !== "male" && question !== "female") {
        question = prompt("Enter the gender you would like to search");
      }
      let genderSearch = searchByGender(people, question);
      return genderSearch;
    } else if (userTraitChoice == "dob") {
      let question = prompt("Enter the date you would like to search");
      let birthdate = searchBD(people, question);
      return birthdate;
    } else if (userTraitChoice == "height") {
      let question = prompt(
        "Enter the height in inches you would like to search"
      );
      let heightNum = searchHeight(people, question);
      return heightNum;
    } else if (userTraitChoice == "weight") {
      let question = prompt("Enter the weight you would like to search");
      let weight = searchByWeight(people, question);
      return weight;
    } else if (userTraitChoice == "eyecolor") {
      let question = prompt("Enter the eye color you would like to search");
      let color = searchByColor(people, question);
      return color;
    }
  }
  if (userChoice == "2") {
    let multipleTraits = prompt(
      "Please enter up to 5 traits to search separated by a comma: Example: gender,dob,height,weight,eyecolor"
    ).split(/[,]+/);

    for (let x = 0; x < multipleTraits.length; x++) {
      if (multipleTraits[x] == "gender") {
        let question = prompt("Enter a gender: ");
        people = searchByGender(people, question);
      } else if (multipleTraits[x] == "dob") {
        let question = prompt("Enter a date. Format: m/d/yyyy: ");
        people = searchBD(people, question);
      } else if (multipleTraits[x] == "height") {
        let question = prompt("Enter a height in inches:");
        people = searchHeight(people, question);
      } else if (multipleTraits[x] == "weight") {
        let question = prompt("Enter a weight: ");
        people = searchByWeight(people, question);
      } else if (multipleTraits[x] == "eyecolor") {
        let question = prompt("Enter an eye color: ");
        people = searchByColor(people, question);
      }
    }
    if (people !== "No matches in the system.") {
      return people;
    } else {
      alert("No matches in the system");
    }
  }
}
