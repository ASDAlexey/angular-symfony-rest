export function convert2FormData(data) {
  const formData: any = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value) {
      if (key === 'image') {
        if (value.hasOwnProperty('file')) formData.append(key, value.file);
        else if (value.hasOwnProperty('src')) formData.append(key, value.src);
      } else formData.append(key, value);
    }
  }
  return formData;
  // log form data
  // new Response(formData).text().then(console.log);
}
