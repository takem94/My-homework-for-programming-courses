let View = {
  results: document.getElementById('results'),

  render (templateName, model) { // имя шаблона, данные
    templateName = templateName + 'Template';

    let templateElement = document.getElementById(templateName);
    let templateSource = templateElement.innerHTML;
    let renderFn = global.Handlebars.compile(templateSource);
    return renderFn(model);
  }
};

export { View };

// задача - отображение данных
