const replaceCards = (temp, animal) => {
  let output = temp.replace(/{%LOCATION%}/g, animal.location);
  output = output.replace(/{%NAME%}/g, animal.name);
  output = output.replace(/{%IMAGE%}/g, animal.image);
  output = output.replace(/{%ID%}/g, animal.id);
  output = output.replace(/{%DESCRIPTION%}/, animal.description);


  return output;
};

module.exports = replaceCards;

