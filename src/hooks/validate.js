function handleValidate(a, b, c, d) {
    function validator(options) {
        var selectorRules = {}

        function getParent(element, selector) {
            while (element.parentElement) {
                if (element.parentElement.matches(selector)) {
                    return element.parentElement
                }
                element = element.parentElement
            }
        }



        function validate(inputelemt, rule) {

            var erroemessage
            var errorelement = getParent(inputelemt, options.formGroupSelector).querySelector(options.errorSelector)

            //lay ra cac rules cua selector
            var rules = selectorRules[rule.selector]


            // lap qua tung rule va kiem tra
            for (var i = 0; i < rules.length; i++) {
                switch (inputelemt.type) {
                    case 'checkbox':
                    case 'radio':
                        erroemessage = rules[i](
                            formElement.querySelector(rule.selector + ':checked')
                        )
                        break;
                    default:
                        erroemessage = rules[i](inputelemt.value)

                }

                if (erroemessage) break;
            }

            if (erroemessage) {
                errorelement.innerText = erroemessage
                getParent(inputelemt, options.formGroupSelector).classList.add('invalid')
            } else {
                errorelement.innerText = ''
                getParent(inputelemt, options.formGroupSelector).classList.remove('invalid')
            }
            return !erroemessage
        }

        var formElement = document.querySelector(options.form)
        var bntSubmit = document.querySelector(options.Bntsubmit)

        if (formElement) {
            var check
            bntSubmit.onClick = function (e) {
                options.rules.forEach(rule => {
                    var inputelemt = formElement.querySelector(rule.selector)
                    check = validate(inputelemt, rule)

                })

                if (check) {
                    var enableInput = formElement.querySelectorAll('[name]')
                    var formValues = Array.from(enableInput).reduce((val, inp) => {
                        val[inp.name] = inp.value
                        return val
                    }, {})
                    //formElement.submit()
                } else {
                    e.preventDefault()
                }



            }


            //lap qua moi rule va xu ly 
            options.rules.forEach(rule => {

                //luu lai cac rules cua moi input
                if (Array.isArray(selectorRules[rule.selector])) {
                    selectorRules[rule.selector].push(rule.test)
                }
                else {
                    selectorRules[rule.selector] = [rule.test]
                }

                var inputelemts = formElement.querySelectorAll(rule.selector)

                Array.from(inputelemts).forEach(function (inputelemt) {
                    //xu ly blur ra input
                    inputelemt.onblur = function () {
                        validate(inputelemt, rule)
                    }

                    inputelemt.oninput = function () {
                        var errorelement = getParent(inputelemt, options.formGroupSelector).querySelector('.form-message')
                        errorelement.innerText = ''
                        getParent(inputelemt, options.formGroupSelector).classList.remove('invalid')
                    }


                })

            });
        }

    }

    validator.isRequire = function (selector, message) {

        return {
            selector: selector,
            test: function (value) {

                return value.trim() ? undefined : message || 'Vui long nhap truong nay'

            }
        }

    }

    validator.isEmail = function (selector, message) {

        return {
            selector: selector,
            test: function (value) {
                var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                return regex.test(value) ? undefined : message || "Truong nay phai la email"
            }
        }
    }

    validator.minLenght = function (selector, min, message) {

        return {
            selector: selector,
            test: function (value) {
                return value.length >= min ? undefined : message || `vui long nhap toi thieu ${min} ky tu`
            }
        }
    }
    validator.isConfirmMed = function (selector, getConfirmValue, message) {
        return {
            selector: selector,
            test: function (value) {
                return value === getConfirmValue() ? undefined : message || 'Gia tri nhap vao khong chinh xac'

            }
        }

    }
    validator({
        form: '#form',
        Bntsubmit: '#bnt-submit',
        errorSelector: "#form-error",
        formGroupSelector: "#form-content",
        rules: [
            validator.isRequire('#name'),
            validator.isRequire('#email'),
            validator.isEmail('#email'),
            validator.isRequire('#password'),
            validator.minLenght('#password', 6),
            validator.isRequire('#Confpassword'),
            validator.isConfirmMed('#Confpassword', function () {
                return document.querySelector('#form #password').value
            }, 'Mat khau khong chinh xac'),
        ]
    });
}
export default handleValidate