/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-inner-declarations */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

function getCaretCharacterOfsetWithin(element) {
  let caretOffset = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  const sel = win.getSelection();
  if (typeof win.getSelection !== 'undefined') {
    console.log({ sel });
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      console.log({ preCaretRange });
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      console.log({ preCaretRange });
      caretOffset = preCaretRange.toString().length;
      console.log(`seen content is :{${preCaretRange.toString()}}`);
    }
  } else if ((sel == doc.selection) && sel.type != 'Control') {
    const textRange = sel.createRange();
    const preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint('EndToEnd', textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}

const lib = {};
lib.$ = (q) => (isElement(q) ? [q] : document.querySelectorAll(q));
lib.isEmpty = (str) => (str ? !`${str}`.trim() : true);

lib.isElement = (o) => (
  typeof HTMLElement === 'object' ? o instanceof HTMLElement
    : o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
);

lib.isEmail = (str) => (!((/[a-z0-9]+@+[a-z0-9]+\.+[a-z]{3,}/i.test(str) === false || /[^a-z0-9._@]/i.test(str) === true)));
lib.isObject = (variable) => (variable && typeof variable === 'object' && variable.constructor === Object);

lib.isDescendant = (e, query) => {
  const matches = typeof (query) === 'string' ? document.querySelectorAll(query) : query;
  let el = lib.isElement(e) ? e : document.querySelector(e);
  let matchesLen = 0;
  if (lib.isElement(matches)) {
    if (query.contains(el)) return query;
  } else if (matches) {
    matchesLen = matches.length;
    while (el && !(el.tagName === 'HTML')) {
      for (let i = 0; i < matchesLen; i += 1) {
        if (el === matches[i]) return el;
      }

      el = el.parentElement;
    }
  }
  return false;
};

lib.isUpperCase = (v) => (!!(v.toUpperCase() !== v.toLowerCase() && v === v.toUpperCase()));

lib.isLowerCase = (v) => (!!(v.toUpperCase() !== v.toLowerCase() && v === v.toLowerCase()));
lib.ucFirst = (value) => {
  if (isNaN(value)) {
    let newValue = '';
    for (let i = 0; i < value.length; i += 1) {
      if (i === 0) {
        newValue = value[0].toUpperCase();
      } else {
        newValue += value[i];
      }
    }
    return newValue;
  }
  return value;
};
lib.lcFirst = (value) => {
  if (isNaN(value)) {
    let newValue = '';
    for (let i = 0; i < value.length; i += 1) {
      if (i === 0) {
        newValue = value[0].toLowerCase();
      } else {
        newValue += value[i];
      }
    }
    return newValue;
  }
  return value;
};
lib.capitalize = (word) => {
  if (isNaN(word) && !lib.isEmpty(word)) {
    let newWord = '';
    const subValue = word.split(' ');
    const subValueLength = subValue.length;
    for (let j = 0; j < subValueLength; j += 1) {
      const value = subValue[j];
      for (let i = 0; i < value.length; i += 1) {
        if (i === 0) {
          newWord += value[0].toUpperCase();
        } else {
          newWord += value[i];
        }
      }

      if (j < subValueLength) {
        newWord += ' ';
      }
    }

    return newWord;
  }
  return word;
};

lib.deleteIndex = (value, ...indexes) => {
  // can input as much parameter as possible but first parameter much be an array obj or string
  const newArray = [];
  const argumentsLength = indexes.length;
  let save = true;
  for (let j = 0; j < value.length; j += 1) {
    save = true;
    for (let i = 0; i < argumentsLength; i += 1) {
      const currentIndex = indexes[i];
      if (j === currentIndex) {
        save = false;
        break;
      }
    }
    if (save) newArray.push(value[j]);
  }
  return typeof (value) === 'string' ? newArray.join('') : newArray;
};

lib.popMessage = (m, timeout = 4500) => {
  const animationTime = 300; // <== value must be the same here and in general.less
  const showMsg = (msg) => {
    setTimeout(() => {
      msg.classList.add('show');
    }, 100);
  };
  let popMsg = document.querySelector('#popMessage');
  const msg = document.createElement('DIV');
  msg.classList = 'message';
  msg.innerHTML = m;

  if (!popMsg) {
    // alert('popMsg not created yet');
    popMsg = document.createElement('DIV');
    popMsg.id = 'popMessage';
    popMsg.appendChild(msg);
    document.querySelector('#root').appendChild(popMsg);
    showMsg(msg);
  } else {
    popMsg.appendChild(msg);
    showMsg(msg);
  }

  setTimeout(() => {
    msg.classList.remove('show');
    setTimeout(() => {
      popMsg.removeChild(msg);
      if (!popMsg.children[0]) {
        document.querySelector('#root').removeChild(popMsg);
      }
    }, animationTime);
  }, timeout);
};

lib.popAlert = (msg) => {
  /* alert();
      USING POPALERT
      #can send in html tags;
      #cant take in functions or methods but can take in string getting methods e.g(document.getElementById(id).innerHTML)
      #can style elements but will have to do the code as a string variable e.g var name= " <b style='color:red'>the name</b> is a smart ass "
      #can set a sub line---passing it as a sting too in the parameters, string starting with 'sub~'
      */
  let popAlert = document.getElementById('popAlert');
  const enterToCancelPopAlert = (event) => {
  // alert("just entered enterToCancelPopAlert()")
    if (event.keyCode === 13) {
      event.preventDefault(); // <== prevent any other function that has been attached to the event
      popCancel();
    }
  };

  const popCancel = () => {
    const pA = document.getElementById('popAlert');
    if (pA) {
      document.querySelector('#root').removeChild(pA);
    }
    window.removeEventListener('keydown', enterToCancelPopAlert);
  };

  if (!popAlert) {
    popAlert = document.createElement('div');
    popAlert.id = 'popAlert';
    popAlert.innerHTML = ` <div class="fk" >
      <div class='content' >
        <div> ${msg}</div>
      </div>\
      <div class='cancel-holder'>
        <button class='btn btn-default cancel'>close</button>
      </div>
    </div> `;
  }
  document.querySelector('#root').appendChild(popAlert);

  document.querySelector('#popAlert .cancel').addEventListener('click', popCancel);
  window.addEventListener('keydown', enterToCancelPopAlert);
};

lib.JSONtoArray = (json) => {
  const r = [];
  // eslint-disable-next-line no-restricted-syntax
  if (lib.isObject(json)) Object.keys(json).forEach((key) => { r.push(json[key]); });
  return r;
};

lib.JSONParse = (str) => {
  try {
    const o = JSON.parse(str);
    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === 'object') return o;
  } catch (e) {
    // console.log(e);
  }

  return false;
};

lib.getWeekDay = (day) => {
  const weekdays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  return isNaN(day) ? false : weekdays[day];
};

lib.getMonth = (month) => {
  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];
  return isNaN(month) ? false : months[month];
};

lib.getRelativeTime = (timestamp, relative = true) => {
  const d1 = new Date();
  const d2 = new Date(timestamp);
  let relativeTime = '';

  let year = d2.getFullYear();
  year = d1.getFullYear() === year ? '' : ` ${year}`;
  const month = lib.getMonth(d2.getMonth());
  let hour = d2.getHours();
  const hourPref = hour >= 12 ? 'pm' : 'am';
  if (hour === 0) {
    hour = 12;
  } else {
    hour = hour > 12 ? hour - 12 : hour;
  }
  const date = d2.getDate() + 1;
  const minutes = d2.getMinutes();
  let minutesDbl = `${minutes}`;
  minutesDbl = minutesDbl.length === 1 ? `0${minutesDbl}` : minutesDbl;
  const day = lib.getWeekDay(d2.getDay());
  if (relative) {
    const diffInMilliseconds = d1 - d2;
    const diffInSec = Math.floor(diffInMilliseconds / 1000);
    if (diffInSec >= 60) { // 60 seconds make a minute
      const diffInMinutes = Math.floor(diffInSec / 60);
      if (diffInMinutes >= 60) { // 60 minutes make in an hour
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours >= 24) { // 24 hours make in a day
          const diffInDays = Math.floor(diffInHours / 24);
          if (diffInDays >= 7) { // 7 day make in a week
            relativeTime = `${day}, ${month} ${date}${year} at ${hour}:${minutesDbl} ${hourPref}`;
          } else if (diffInDays === 1) {
            relativeTime = `yesterday at ${hour}:${minutesDbl} ${hourPref}`;
          } else {
            relativeTime = `last ${day} at ${hour}:${minutesDbl} ${hourPref}`;
          }
        } else relativeTime = `${diffInHours}hr${diffInHours > 1 ? 's' : ''} ago`;
      } else relativeTime = `${diffInMinutes}min${diffInMinutes > 1 ? 's' : ''} ago`;
    } else relativeTime = 'just now';
  } else {
    relativeTime = `${day}, ${month} ${date}${year} at ${hour}:${minutesDbl} ${hourPref}`;
  }

  return relativeTime;
};

lib.onDOMChange = (config = {
  attributes: false,
  attributeOldValue: false,
  childList: false,
  characterData: false,
  characterDataOldValue: false,
  subtree: false,
  targetNode: window.document, // <== Select the node that will be observed for mutations
}, callback = (mutationsList, observe) => {}) => {
  // Options for the observer (which mutations to observe)
  const Config = {
    ...{
      attributes: false,
      attributeOldValue: false,
      childList: false,
      characterData: false,
      characterDataOldValue: false,
      subtree: false,
      targetNode: window.document, // <== Select the node that will be observed for mutations
    },
    ...config,
  };

  // Create an observer instance linked to the callback function
  const { MutationObserver } = window;
  const observer = new MutationObserver(callback); // <== Callback function to execute when mutations are observed

  // Start observing the target node for configured mutations
  observer.observe(Config.targetNode, Config);
  // Later, you can stop observing
  // observer.disconnect();
  return observer;
};

/**
      In other for the elmenet to the placed exactly where you want it to be in relaive to the flow of the page
      "getRelativePosition" takes the position of the element in the page flow(getPosition()) and returns the relative position of the element to the nearest non-static('absolute', 'relative' or 'fixed') parent
  */
lib.getRelativePosition = (el, xPos, yPos) => {
  let relativeX;
  let relativeY;
  // alert("we are about to call getRelativeParent in getRelativePosition")
  const elRelativeParent = getRelativeParent(el);
  /* alert("we've called getRelativeParent in getRelativePosition\n"
  +"and elRelativeParent id is : " + elRelativeParent.id
  ); */

  if (elRelativeParent.tagName === 'BODY') {
    relativeX = xPos;
    relativeY = yPos;
  } else {
    // Number(back.style.transform.split("deg")[0].split("(")[1]);
    const elRelativeParentStyle = window.getComputedStyle(elRelativeParent, null);
    const elRelativeParentBorderLeft = Number(elRelativeParentStyle.getPropertyValue('border-left-width').split('px')[0]);
    const elRelativeParentBorderTop = Number(elRelativeParentStyle.getPropertyValue('border-top-width').split('px')[0]);
    // alert("elRelativeParentBorderLeft is : " + elRelativeParentBorderLeft);

    const elRelativeParentPosition = getPosition(elRelativeParent);
    const elRelativeParentLeft = elRelativeParentPosition.left;
    const elRelativeParentTop = elRelativeParentPosition.top;
    /*  console.log({
      elRelativeParentPosition,
      elRelativeParentLeft,
      elRelativeParentTop,
    }); */
    // alert("the element that this position relate to have the id : " + elRelativeParent.id+ "its left is : " + elParentLeft)

    relativeX = xPos - (elRelativeParentLeft + elRelativeParentBorderLeft);
    relativeY = yPos - (elRelativeParentTop + elRelativeParentBorderTop);
  }
  return {
    left: relativeX,
    top: relativeY,
  };
};

lib.getRelativeParent = (el) => {
  /* /
      returns the element(ancestor) which the element(el) will be positioned in relative to in the page flow
  */

  let returnVar;
  let elParent;
  let elParentStyle;
  let elParentStylePosition;
  while (el) {
    elParent = el.offsetParent;
    elParentStyle = window.getComputedStyle(elParent, null);
    elParentStylePosition = elParentStyle.getPropertyValue('position');
    if (el.tagName === 'BODY') {
      [returnVar] = $('body');
      break;
    } else if (!(elParentStylePosition === 'static') || (elParent.tagName === 'BODY')) {
      returnVar = elParent;
      break;
    } else {
      el = elParent;
    }
  }
  return returnVar;
};

lib.getPosition = (el) => {
  [el] = $(el);
  // to get the location of an element in page in relative to the nearest parent that shares the same position with it
  let xPos = 0;
  let yPos = 0;
  while (el) {
    // for all other non-BODY elements
    xPos += el.offsetLeft;
    yPos += el.offsetTop;
    el = el.offsetParent;
  }
  // alert(xPos +"\n"+ yPos);
  return {
    left: xPos,
    top: yPos,

  };
};

lib.getCordinates = (el, scrollContainer = lib.$('html')[0]) => {
  const elem = lib.isElement(el) ? el : lib.$(el);
  const xPos = elem.offsetLeft - scrollContainer.scrollLeft;
  const yPos = elem.offsetTop - scrollContainer.scrollTop;
  // console.log('in the gu: ', {elem, scrollContainer,xPos, yPos});

  return {
    left: xPos,
    top: yPos,
  };
};

lib.parallaxBk = {
  container: null,
  stop: () => {
    window.removeEventListener('scroll', lib.parallaxBk.onScroll);
  },
  init: (container = window) => {
    parallaxBk.container = container;
    container.addEventListener('scroll', lib.parallaxBk.onScroll);
  },
  scroll: (parallaxBk) => {
    const container = parallaxBk.parentElement;
    const containerHeight = container.offsetHeight;
    const containerTop = lib.getCordinates(container).top;
    let containerPtop = container.offsetTop;
    const containerBottom = containerTop + containerHeight;
    // console.log({
    //   containerTop,
    //   libParallaxBkContainerInnerHeight: lib.parallaxBk.container.innerHeight,
    //   containerBottom,
    // });
    if (containerTop <= lib.parallaxBk.container.innerHeight && containerBottom >= 0) {
      containerPtop = containerPtop > window.innerHeight ? window.innerHeight : containerPtop;
      // v the amount of distance the parallax bk have moved (in percentage)
      // eslint-disable-next-line max-len
      const displacement = ((containerTop - containerPtop) / (containerPtop + containerHeight)) * 100;
      const relativeDisplacement = (displacement / 100) * (parallaxBk.offsetHeight - containerHeight);
      parallaxBk.style.transform = `translate3d(0px, ${relativeDisplacement}px, 0px)`;
    }
  },
  onScroll: () => {
    lib.$('.parallax-bk').forEach((parallaxBk) => {
      lib.parallaxBk.scroll(parallaxBk);
    });
  },

};

lib.heroCheckBox = {
  onClick: (parent) => {
    const checkBox = parent.querySelector('.hero-check-box-field');
    if (checkBox.classList.contains('checked')) {
      checkBox.classList.remove('checked');
    } else checkBox.classList.add('checked');
  },
  stop: () => {},
  init: (params = {
    onClick: (heroCheckBox) => {},
  }) => {
    alert('want hero chkeddck box shit');
    const init = () => {
      const checkBoxes = document.querySelectorAll('.hero-check-box');
      for (let i = 0; i < checkBoxes.length; i += 1) {
        if (checkBoxes[i].init_check_box !== true) {
          checkBoxes[i].init_check_box = true;
          checkBoxes[i].addEventListener('click', (event) => {
            lib.heroCheckBox.onClick(checkBoxes[i]);
            if (params.onClick) params.onClick(event);
          });
        }
      }
    };

    init();

    const observer = lib.onDOMChange({ childList: true, subtree: true }, (mutationsList) => {
      for (const mutation of mutationsList) {
        // console.log('mutation for checkbox is = > ', mutation, 'asnd observer is => ', observer);
        if (mutation.type === 'childList') {
          const addedChildren = mutation.addedNodes;
          // console.log("childList attributeName is = > ", mutation.attributeName ,", mutation \n=> ", mutation)
          if (addedChildren.length > 0) {
            init();
          }
        }
      }
    });

    lib.heroCheckBox.stop = () => {
      observer.disconnect();
    };
  },
};

lib.countries = [
  'afghanistan',
  'albania',
  'algeria',
  'andorra',
  'angola',
  'antigua and barbuda',
  'argentina',
  'armenia',
  'australia',
  'austria',
  'azerbaijan',
  'bahamas',
  'bahrain',
  'bangladesh',
  'barbados',
  'belarus',
  'belgium',
  'belize',
  'benin',
  'bhutan',
  'bolivia',
  'bosnia and herzegovina',
  'botswana',
  'brazil',
  'brunei',
  'bulgaria',
  'burkina faso',
  'burundi',
  'cote d ivoire',
  'cabo verde',
  'cambodia',
  'cameroon',
  'canada',
  'central african republic',
  'chad',
  'chile',
  'china',
  'colombia',
  'comoros',
  'congo',
  'costa rica',
  'croatia',
  'cuba',
  'cyprus',
  'czech republic',
  'democratic republic of the congo',
  'denmark',
  'djibouti',
  'dominica',
  'dominican republic',
  'ecuador',
  'egypt',
  'el salvador',
  'equatorial guinea',
  'eritrea',
  'estonia',
  'ethiopia',
  'fiji',
  'finland',
  'france',
  'gabon',
  'gambia',
  'georgia',
  'germany',
  'ghana',
  'greece',
  'grenada',
  'guatemala',
  'guinea',
  'guineabissau',
  'guyana',
  'haiti',
  'holy see',
  'honduras',
  'hungary',
  'iceland',
  'india',
  'indonesia',
  'iran',
  'iraq',
  'ireland',
  'israel',
  'italy',
  'jamaica',
  'japan',
  'jordan',
  'kazakhstan',
  'kenya',
  'kiribati',
  'kuwait',
  'kyrgyzstan',
  'laos',
  'latvia',
  'lebanon',
  'lesotho',
  'liberia',
  'libya',
  'liechtenstein',
  'lithuania',
  'luxembourg',
  'macedonia',
  'madagascar',
  'malawi',
  'malaysia',
  'maldives',
  'mali',
  'malta',
  'marshall islands',
  'mauritania',
  'mauritius',
  'mexico',
  'micronesia',
  'moldova',
  'monaco',
  'mongolia',
  'montenegro',
  'morocco',
  'mozambique',
  'myanmar',
  'namibia',
  'nauru',
  'nepal',
  'netherlands',
  'new zealand',
  'nicaragua',
  'niger',
  'nigeria',
  'north korea',
  'norway',
  'oman',
  'pakistan',
  'palau',
  'palestine state',
  'panama',
  'papua new guinea',
  'paraguay',
  'peru',
  'philippines',
  'poland',
  'portugal',
  'qatar',
  'romania',
  'russia',
  'rwanda',
  'saint kitts and nevis',
  'saint lucia',
  'saint vincent and the grenadines',
  'samoa',
  'san marino',
  'sao tome and principe',
  'saudi arabia',
  'senegal',
  'serbia',
  'seychelles',
  'sierra leone',
  'singapore',
  'slovakia',
  'slovenia',
  'solomon islands',
  'somalia',
  'south africa',
  'south korea',
  'south sudan',
  'spain',
  'sri lanka',
  'sudan',
  'suriname',
  'swaziland',
  'sweden',
  'switzerland',
  'syria',
  'tajikistan',
  'tanzania',
  'thailand',
  'timorleste',
  'togo',
  'tonga',
  'trinidad and tobago',
  'tunisia',
  'turkey',
  'turkmenistan',
  'tuvalu',
  'uganda',
  'ukraine',
  'united arab emirates',
  'united kingdom',
  'united states of america',
  'uruguay',
  'uzbekistan',
  'vanuatu',
  'venezuela',
  'viet nam',
  'yemen',
  'zambia',
  'zimbabwe',
];

lib.isCountry = (country) => lib.countries.indexOf(country) !== -1;

lib.arrNormalize = (arr) => {
  const newArr = [];
  for (const value of arr) if (newArr.indexOf(value) === -1) newArr.push(value.trimLeft());
  return newArr;
};

lib.devalueString = (string) => {
  let returnee = '';
  for (let i = 0; i < string.length; i += 1) {
    if (isUpperCase(string[i])) {
      // popMessage(string[i] + " is isUpperCase")
      returnee += ` ${string[i].toLowerCase()}`;
    } else if (string[i] === '_' || string[i] === '-') {
      returnee += ' ';
    } else {
      returnee += string[i];
    }
  }

  return returnee;
};

lib.strToArr = (string) => {
  const arr = [];
  for (let i = 0; i < string.length; i += 1) {
    arr.push(string[i]);
  }

  return arr;
};

lib.strReverse = (string) => {
  const arr = lib.strToArr(`${string}`);
  return arr.reverse().join('');
};

export const { $ } = lib;
export const { strReverse } = lib;
export const { devalueString } = lib;
export const { onDOMChange } = lib;
export const { isEmpty } = lib;
export const { isElement } = lib;
export const { isEmail } = lib;
export const { isObject } = lib;
export const { isDescendant } = lib;
export const { isUpperCase } = lib;
export const { isLowerCase } = lib;
export const { ucFirst } = lib;
export const { lcFirst } = lib;
export const { capitalize } = lib;
export const { deleteIndex } = lib;
export const { popMessage } = lib;
export const { popAlert } = lib;
export const { JSONtoArray } = lib;
export const { JSONParse } = lib;
export const { parallaxBk } = lib;
export const { heroInput } = lib;
export const { heroCheckBox } = lib;
export const { countries } = lib;
export const { isCountry } = lib;
export const { getWeekDay } = lib;
export const { getMonth } = lib;
export const { getRelativeTime } = lib;
export const { getRelativeParent } = lib;
export const { getRelativePosition } = lib;
export const { getPosition } = lib;
export const { getCordinates } = lib;
export const { arrNormalize } = lib;
export const parseQueryString = (query) => {
  const obj = {};
  let values = query.split('?');
  if (values[1]) {
    values = values[1].split('&');
    values.forEach((value) => {
      const foo = value.split('=');
      obj[foo[0]] = foo[1];
    });
  }
  return obj;
};
