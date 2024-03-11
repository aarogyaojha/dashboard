function getUserDetails(username) {
  var sheet = SpreadsheetApp.openById('1RvK9NfvgHSNP_UpOjlW6FmuXWPaXMiuDwE9ScQBQPgI').getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == username) {
      return {
        name: data[i][2],
        phoneNumber: data[i][3],
        gender: data[i][4],
        nationality: data[i][5],
        college: data[i][6]
      };
    }
  }
  return null;
}

function validateLogin(username, password) {
  var sheet = SpreadsheetApp.openById('1RvK9NfvgHSNP_UpOjlW6FmuXWPaXMiuDwE9ScQBQPgI').getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == username && data[i][1] == password) {
      return true;
    }
  }
  return false;
}

function doPost(e) {
  var username = e.parameter.username;
  var password = e.parameter.password;

  var valid = validateLogin(username, password);
  var userDetails = valid ? getUserDetails(username) : null;

  return ContentService.createTextOutput(JSON.stringify({
    valid: valid,
    userDetails: userDetails
  })).setMimeType(ContentService.MimeType.JSON);
}

// function doGet(e) {
//   var username = e.parameter.username;

//   var userDetails = getUserDetails(username);

//   return ContentService.createTextOutput(JSON.stringify(userDetails)).setMimeType(ContentService.MimeType.JSON);
// }

function doGet(e) {
  var username = e.parameter.username;
  var password = e.parameter.password;

  // Hash the password
  var hashedPassword = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password);
  var hashedPasswordBase64 = Utilities.base64Encode(hashedPassword);

  var valid = validateLogin(username, hashedPasswordBase64);
  var userDetails = valid ? getUserDetails(username) : null;

  return ContentService.createTextOutput(JSON.stringify(userDetails)).setMimeType(ContentService.MimeType.JSON);
}


