function getCookies () {
  let res = {};

  let cookies = document.cookie;

  if (cookies.length < 1) {
    return res;
  }

  cookies = cookies.split('; ');

  cookies.forEach(function (item) {
    let arr = item.split('=');

    res[arr[0]] = arr[1];
  });

  return res;
}

export { getCookies };
