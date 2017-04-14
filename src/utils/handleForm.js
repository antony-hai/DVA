const getElem = (form, target) => {
  return (
    document.getElementById(target)
    || form.querySelector(`input[name="${target}"]`)
    || form.querySelector(`select[name="${target}"]`)
    || form.querySelector(`textarea[name="${target}"]`)
  )
}

const getFieldValue = (form, target) => {
  if (typeof form === 'object') {
    const elem = getElem(form, target)
    if (elem) {
      return elem.value.trim()
    }
  }
  return ''
}

const clearFieldValue = (form, target) => {
  if (typeof form === 'object') {
    const elem = getElem(form, target)
    if (elem) {
      elem.value = ''
    }
  }
}

function getFormData(form, target) {
  const formElem = form || document
  if (target) {
    return getFieldValue(formElem, target)
  }
  const data = {}
  const elems = formElem.querySelectorAll(['input', 'select', 'textarea'])
  elems.forEach((ele) => {
    const name = ele.name || ele.id
    const value = ele.value.trim()
    const type = ele.type
    if (type === 'radio' || type === 'checkbox') {
      if (ele.checked) {
        data[name] = value
      }
    } else if (name) {
      data[name] = value
    }
  })
  return data
}

function clearFormData(form, target) {
  const formElem = form || document
  if (target) {
    clearFieldValue(formElem, target)
  } else {
    const elems = formElem.querySelectorAll(['input', 'select', 'textarea'])
    elems.forEach((ele) => {
      const dom = ele
      dom.value = ''
    })
  }
}

export default { getFormData, clearFormData }
