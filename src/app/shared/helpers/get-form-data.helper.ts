export function convert2FormData(data) {
  const formData: any = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value.hasOwnProperty('file') ? value.file : value);
  }
  return formData;
  // log form data
  // new Response(formData).text().then(console.log);
}
