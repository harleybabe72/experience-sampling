/**
 * Experience Sampling consent page.
 */

var setupSurvey = {};  // Namespace variable
setupSurvey.status = constants.SETUP_PENDING;
setupSurvey.questions = [];
setupSurvey.isSubmitted = false;  // Whether the user submitted the form.


/**
 * A helper method for updating the value in local storage.
 * @param {string} newState The desired new state for the setup pref.
 */
function setSetupStorageValue(newState) {
  setupSurvey.status = newState;
  var items = {};
  items[constants.SETUP_KEY] = newState;
  chrome.storage.sync.set(items);
}

/**
 * Convenience method for adding questions.
 * @param {Object} parentNode The DOM node to add the question to.
 * @param {Question} question The Question you want to add.
 */
function addQuestion(parentNode, question) {
  setupSurvey.questions.push(question);
  parentNode.appendChild(question.makeDOMTree());
}

/**
 * Adds the questions for the setup survey.
 * @param {object} parentNode The DOM node to attach the surveys to.
 */
function addQuestions(parentNode) {
  var age = new FixedQuestion(
      constants.QuestionType.RADIO,
      'What is your age?',
      true,
      [
        '17 years old or younger',
        '18-24',
        '25-34',
        '35-44',
        '45-54',
        '55-64',
        '65 or older',
        constants.NO_ANSWER
      ],
      constants.Randomize.NONE);
  addQuestion(parentNode, age);

  var gender = new FixedQuestion(
      constants.QuestionType.CHECKBOX,
      'What is your gender?',
      true,
      [
        'Female',
        'Male',
        constants.OTHER,
        constants.NO_ANSWER
      ],
      constants.Randomize.NONE);
  addQuestion(parentNode, gender);

  var education = new FixedQuestion(
      constants.QuestionType.RADIO,
      'What is the highest degree or level of school that you have completed?',
      true,
      [
        'Some high school',
        'High school or equivalent',
        'Technical/Trade school',
        'Some university, no degree',
        'Associates degree (for example, AS, AA)',
        'Bachelors degree (for example, BS, BA)',
        'Graduate degree',
        constants.OTHER,
        constants.NO_ANSWER
      ],
      constants.Randomize.NONE);
  addQuestion(parentNode, education);

  var occupation = new EssayQuestion(
      constants.QuestionType.SHORT_STRING,
      'What is your occupation?',
      false);
  addQuestion(parentNode, occupation);

  var country = new FixedQuestion(
      constants.QuestionType.DROPDOWN,
      'In what country do you live?',
      false,
      [
        'United States of America',
        'Canada',
        'United Kingdom',
        'Afghanistan',
        'Aland Islands',
        'Albania',
        'Algeria',
        'American Samoa',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia',
        'Bonaire, Saint Eustatius and Saba',
        'Bosnia and Herzegovina',
        'Botswana',
        'Brazil',
        'British Virgin Islands',
        'Brunei Darussalam',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cabo Verde',
        'Cambodia',
        'Cameroon',
        'Cayman Islands',
        'Central African Republic',
        'Chad',
        'Channel Islands',
        'Chile',
        'China',
        'Colombia',
        'Comoros',
        'Congo',
        'Cook Islands',
        'Costa Rica',
        'Cote d\'Ivoire',
        'Croatia',
        'Cuba',
        'Curacao',
        'Cyprus',
        'Czech Republic',
        'Democratic People\'s Republic of Korea',
        'Democratic Republic of the Congo',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Ethiopia',
        'Faeroe Islands',
        'Falkland Islands (Malvinas)',
        'Fiji',
        'Finland',
        'France',
        'French Guiana',
        'French Polynesia',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guadeloupe',
        'Guam',
        'Guatemala',
        'Guernsey',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Holy See',
        'Honduras',
        'Hong Kong',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Isle of Man',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jersey',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Kuwait',
        'Kyrgyzstan',
        'Lao People\'s Democratic Republic',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Martinique',
        'Mauritania',
        'Mauritius',
        'Mayotte',
        'Mexico',
        'Micronesia',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Montserrat',
        'Morocco',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'Niue',
        'Norfolk Island',
        'Northern Mariana Islands',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Pitcairn',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatar',
        'Republic of Korea',
        'Republic of Moldova',
        'Reunion',
        'Romania',
        'Russian Federation',
        'Rwanda',
        'Saint-Barthelemy',
        'Saint Helena',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint-Martin',
        'Saint Pierre and Miquelon',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Sark',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Sint Maarten',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'State of Palestine',
        'Sudan',
        'Suriname',
        'Svalbard and Jan Mayen Islands',
        'Swaziland',
        'Sweden',
        'Switzerland',
        'Syrian Arab Republic',
        'Tajikistan',
        'Thailand',
        'Timor-Leste',
        'Togo',
        'Tokelau',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Turks and Caicos Islands',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Republic of Tanzania',
        'U.S. Virgin Islands',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Venezuela',
        'Viet Nam',
        'Wallis and Futuna Islands',
        'Western Sahara',
        'Yemen',
        'Zambia',
        'Zimbabwe'
      ],
      constants.Randomize.NONE);
  var state = new FixedQuestion(
      constants.QuestionType.DROPDOWN,
      'Which state?',
      false,
      [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
        'District of Columbia',
        'Puerto Rico',
        'Guam',
        'American Samoa',
        'U.S. Virgin Islands',
        'Northern Mariana Islands'
      ],
      constants.Randomize.NONE);
  country.addDependentQuestion(state, 'United States of America');
  addQuestion(parentNode, country);

  var source = new EssayQuestion(
      constants.QuestionType.SHORT_STRING,
      'How did you hear about this study?',
      false);
  addQuestion(parentNode, source);

  var computerOwner = new FixedQuestion(
      constants.QuestionType.RADIO,
      'Whose computer are you using?',
      true,
      [
        'Mine',
        'A friend or family member\'s',
        'My employer\'s',
        'My school\'s',
        'A library\'s',
        constants.OTHER,
        constants.NO_ANSWER
      ],
      constants.Randomize.NONE);
  addQuestion(parentNode, computerOwner);

  var antivirus = new FixedQuestion(
      constants.QuestionType.RADIO,
      'Does the computer you\'re using have anti-virus software' +
      ' running on it?',
      true,
      [
        'Yes',
        'No',
        'I don\'t know',
        constants.NO_ANSWER
      ],
      constants.Randomize.NONE);
  addQuestion(parentNode, antivirus);

  var techFamiliar = new ScaleQuestion(
      constants.QuestionType.MULT_HORIZ_SCALE,
      'How familiar are you with each of the following computer and' +
      ' Internet-related items? I have...',
      false,
      [
        'No understanding',
        'Little understanding',
        'Some understanding',
        'Good understanding',
        'Full understanding'
      ],
      constants.Randomize.ALL);
  techFamiliar.setAttributes(
      [
        'Captcha',
        'Phishing',
        'JavaScript',
        'Linux',
        'TCP/IP',
        'FAQ',
        'HTRMB',
        'DendoPort'
      ]);
  addQuestion(parentNode, techFamiliar);
}

/**
 * Sets up the survey form based on the saved survey value.
 * @param {object} savedState Object possibly containing the setup status.
 */
function setupSurveyForm(savedState) {
  // Get the value from storage; save an initial value if empty.
  if (!savedState || savedState[constants.SETUP_KEY] == null) {
    setSetupStorageValue(constants.SETUP_PENDING);
  } else {
    setupSurvey.status = savedState[constants.SETUP_KEY];
  }
  console.log('Setup survey status: ' + setupSurvey.status);

  if (setupSurvey.status == constants.SETUP_PENDING) {
    // Show the survey.
    $('explanation').classList.remove('hidden');
    $('survey-container').classList.remove('hidden');
    addQuestions($('survey-form'));
    $('survey-form').appendChild(makeSubmitButtonDOM());
    document.forms['survey-form'].addEventListener(
        'submit', setupFormSubmitted);
    var selectElements = document.getElementsByTagName('select');
    for (var i = 0; i < selectElements.length; i++) {
      selectElements[i].selectedIndex = -1;
    }
  } else if (setupSurvey.status == constants.SETUP_COMPLETED) {
    // Show a notice that the survey was already completed.
    $('already-completed').classList.remove('hidden');
    setTimeout(window.close, constants.SURVEY_CLOSE_TIME);
  }
}

/**
 * Handles the submission of the setup survey.
 * @param {object} The submission button click event.
 */
function setupFormSubmitted(event) {
  event.preventDefault();
  setupSurvey.isSubmitted = true;

  // Check whether the participant is underage.
  var ageQuestion = document['survey-form']['Whatisyourage'];
  if (ageQuestion.value === '0-17yearsoldoryounger-Whatisyourage') {
    chrome.management.uninstallSelf();
    return;
  } else if (ageQuestion.value === '7-Iprefernottoanswer-Whatisyourage') {
    if (!confirm("We need to know your approximate age to make sure you're " +
        "over 18.")) {
      // User did not click "OK".
      chrome.management.uninstallSelf();
    }
    return;
  }

  var responses = getFormValues(setupSurvey.questions, document['survey-form']);
  var query = window.location.search.substring(1);
  var os = new SurveySubmission.Response('OS', query.split('=')[1]);
  responses.push(os);
  chrome.runtime.sendMessage(
    {
      'message_type': constants.MSG_SURVEY,
      'survey_type': constants.SurveyLocation.SETUP,
      'responses': responses
    }
  );

  setSetupStorageValue(constants.SETUP_COMPLETED);
  $('explanation').classList.add('hidden');
  $('survey-container').classList.add('hidden');
  $('thank-you').classList.remove('hidden');
  setTimeout(window.close, constants.SURVEY_CLOSE_TIME);
}

/**
 * Looks up values from local storage to set up the initial state. This should
 * be the first method called when the page is loaded.
 */
function getInitialState() {
  console.log('Setup survey loading');
  chrome.storage.sync.get(constants.SETUP_KEY, setupSurveyForm);
}

document.addEventListener('DOMContentLoaded', getInitialState);

/**
 * The sync'ed setup value has been updated. This might mean the user has
 * done setup on another computer, and this window should be closed.
 */
function setupMaybeDoneElsewhere(message) {
  if (message[constants.MSG_TYPE] !== constants.MSG_SETUP ||
      setupSurvey.status === constants.SETUP_COMPLETED) {
    return;
  }

  window.close();
}
chrome.runtime.onMessage.addListener(setupMaybeDoneElsewhere);

/**
 * Prompt the user on close, if the form has been started but not yet submitted.
 * @param {object} event The window close event.
 */
function promptOnClose(event) {
  if (setupSurvey.isSubmitted) return;
  if (!formHasContent($('survey-form'))) return;

  event.returnValue = "Oops! Closing now will throw away your answers.";
}
window.addEventListener('beforeunload', promptOnClose);
