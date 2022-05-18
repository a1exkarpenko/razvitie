function callInit() {
    const buttons = document.querySelectorAll('[data-call]')
    const indiSection = document.querySelector('section.indi')
    const body = document.querySelector('body')
    const popup = document.querySelector('.popup')
    const popupClose = document.querySelector('.popup__close')

    const openPopup = () => {
        popup.classList.remove('popup-hidden')
        body.classList.add('body-lock')
    }
    const closePopup = () => {
        popup.classList.add('popup-hidden')
        body.classList.remove('body-lock')
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.innerWidth <= 1180) {
                return openPopup()
            }
            indiSection.scrollIntoView({behavior: 'smooth'})
        })
    })

    popupClose.addEventListener('click', closePopup)

    setTimeout(openPopup, 120_000)
}
function dropListInit() {
    const dropItems = document.querySelectorAll('.objects__item')

    dropItems.forEach(node => {
        node.children[0].addEventListener('click', () => {
            const element = node.children[1]
            const scrollHeight = element.scrollHeight
            element.classList.toggle('objects-open')
            element.style.maxHeight = element.classList.contains('objects-open')
                ? element.children.length * 7 + scrollHeight + "px"
                : null
            node.children[0].classList.toggle('objects-open')
        })
    })

    // another
    const dropItems2 = document.querySelectorAll('.faq__button')

    dropItems2.forEach(button => {
        button.addEventListener('click', () => {
            button.parentNode.classList.toggle('faq-open')
            const text = button.parentNode.children[1]
            text.style.maxHeight = button.parentNode.classList.contains('faq-open')
                ? text.scrollHeight + 'px'
                : null
        })
    })

}
function formInit() {
    const nextButtons = document.querySelectorAll('.indi-next')
    const backButtons = document.querySelectorAll('.indi-back')
    const formList = document.querySelector('.indi__form-list')
    const width = document.querySelector('.indi__right').clientWidth
    const steps = document.querySelectorAll('[data-step]')
    let currentStep = 1

    const render = () => {
        steps.forEach(step => {
            const stepValue = parseInt(step.getAttribute('data-step'))
            if (stepValue === currentStep)
                step.classList.add('current-step')
            else
                step.classList.remove('current-step')
        })
        formList.style.left = -((currentStep - 1) * width) + "px"
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep++
            render()
        })
    })
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--
            render()
        })
    })

    // ====
    const formButton = document.querySelector('.indi-submit')
    const form = document.querySelector('.indi__right')
    const months = document.querySelector('[name="months"]')
    const sum = document.querySelector('[name="sum"]')
    const phone = document.querySelector('#form-phone')
    const place = document.querySelector('[name="place"]')
    const name = document.querySelector('[name="name"]')
    const type = document.querySelector('[name="type"]')
    const object = document.querySelector('[name="object"]')
    // Inputmask({ mask: "999", "placeholder": "" }).mask(months)
    // Inputmask({ mask: "9999999999", "placeholder": "" }).mask(sum)
    // Inputmask({ mask: "+7(999) 999-99-99" }).mask(phone)

    const checkValue = (element, step) => {
        if (!element.value) {
            currentStep = step
            render()
            element.style.borderColor = "#474747"
            element.focus()
            setTimeout(() => {
                element.style.borderColor = "#b68300"
            }, 5000);
            formList.style.left = -((step - 1) * width) + "px"
            return false
        }
        return true
    }

    const checkAll = () => {
        // if (phone.value.length !== 17)
        //     return false
        if (!checkValue(sum, 1) ||
            !checkValue(months, 1) ||
            !checkValue(type, 1) ||
            !checkValue(object, 2) ||
            !checkValue(place, 2) ||
            !checkValue(name, 3) ||
            !checkValue(phone, 3))
            return false
        return true
    }

    formButton.addEventListener('click', () => {
        if (!checkAll())
            return false
    })

    form.addEventListener('keydown', (event) => {
        if (event.keyCode == 13) {
            event.preventDefault();
            if (!checkAll())
                return false;
        }
    })
}
// function phoneInit() {
//     const input = document.querySelector(".use-m__input")
//     Inputmask({ mask: "+7(999) 999-99-99" }).mask(input)

//     const input2 = document.querySelector("#footer__phone")
//     Inputmask({ mask: "+7(999) 999-99-99" }).mask(input2)

//     const input3 = document.querySelector(".popup__input")
//     Inputmask({ mask: "+7(999) 999-99-99" }).mask(input3)
// }
function rangeSlidersInit() {
    const rangeBlocks = document.querySelectorAll('[data-range-block]')
    const paymentTypes = document.querySelectorAll('[data-tab-content]')
    // const scheduleButton = document.querySelector('#payment-schedule')
    // const body = document.querySelector('body')
    // const scheduleSection = document.querySelector('.schedule')
    // const scheduleExit = document.querySelector('.schedule__exit')
    // const scheduleList = document.querySelector('.schedule__list')
    // const scheduleFooter = document.querySelector('.schedule__footer')

    // сумма кредита
    const currentSum = document.querySelector('#current-sum-value')
    const sumSlider = document.querySelector('#calc-sum')
    const sumSliderLine = document.querySelector('#calc-sum-line')

    // сумма платежа
    const currentSumMonthly = document.querySelector('#current-sum-value-monthly')
    const sumSliderMonthly = document.querySelector('#calc-sum-monthly')
    const sumSliderLineMonthly = document.querySelector('#calc-sum-line-monthly')

    // Месяц
    const monthSlider = document.querySelector('#calc-month')
    const monthSliderLine = document.querySelector('#calc-month-line')
    const currentMonth = document.querySelector('#current-month-value')

    // результат
    const resultSum = document.querySelector('#result-sum')
    const everyMonthPaymentElement = document.querySelector('#calc-every-month')

    // Вставка данных в форму
    const getMoneyButton = document.querySelector('.calc__button[data-call]')
    const inputSum = document.querySelector('[name="sum"]')
    const inputMonths = document.querySelector('[name="months"]')
    getMoneyButton.addEventListener('click', () => {
        inputMonths.value = monthSlider.value
        inputSum.value = resultSum.textContent
    })


    // variables
    let currentPaymentType = 'credit'
    // const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    // const paymentInfo = {
    //     dates: [],
    //     summs: [],
    //     mainSumms: [],
    //     percentSumms: [],
    //     finalSum: 0,
    //     mainFinalSum: 0,
    //     percentFianlSum: 0
    // }

    // change payment type hanbdler
    paymentTypes.forEach(type => {
        type.addEventListener('click', () => {
            currentPaymentType = type.getAttribute('data-tab-content')
            paymentTypes.forEach(item => {
                if (item.getAttribute('data-tab-content') === currentPaymentType)
                    item.classList.add('calc-current')
                else
                    item.classList.remove('calc-current')
            })
            rangeBlocks.forEach(item => {
                if (item.getAttribute('data-range-block') === currentPaymentType)
                    item.classList.remove('calc-d-none')
                else
                    item.classList.add('calc-d-none')
            })
            createPaymentScheduleInfo()
        })
    })

    // line width handler
    const lineSliderHandler = (slider, line, value) => {
        const width = Math.round(slider.value / value * 100)
        line.style.width = width + "%"
    }

    // visible sum hundler
    const digitSliderHandler = (element, digit) => {
        element.textContent = (digit / 1).toLocaleString('ru-RU')
    }

    // rounding value
    const rounded = (number) => +number.toFixed()

    // create payment schedule info
    const createPaymentScheduleInfo = () => {
        if (currentPaymentType === "credit") {
            resultSum.textContent = rusNumber(sumSlider.value)
            const percentSum = sumSlider.value * 0.18
            const everyMonthPayment = rounded(percentSum / monthSlider.value)
            everyMonthPaymentElement.textContent = rusNumber(everyMonthPayment)
        } else {
            everyMonthPaymentElement.textContent = rusNumber(sumSliderMonthly.value)
            const sumOnFullTime = rounded(sumSliderMonthly.value * monthSlider.value / 0.18)
            resultSum.textContent = rusNumber(sumOnFullTime)
        }
    }

    // const loadData = () => {
    //     paymentInfo.dates = []
    //     paymentInfo.summs = []
    //     paymentInfo.mainSumms = []
    //     paymentInfo.percentSumms = []
    //     paymentInfo.finalSum = 0
    //     paymentInfo.mainFinalSum = 0
    //     paymentInfo.percentFianlSum = 0

    //     if (currentPaymentType === "credit") {
    //         resultSum.textContent = rusNumber(sumSlider.value)
    //         const percentSum = sumSlider.value * 0.18
    //         const everyMonthPayment = rounded(percentSum / monthSlider.value)
    //         everyMonthPaymentElement.textContent = rusNumber(everyMonthPayment)
    //         const date = new Date()
    //         let curMonth = date.getMonth()
    //         let curYear = date.getFullYear()
    //         for (let i = 0; i < monthSlider.value; i++) {
    //             paymentInfo.summs.push(everyMonthPayment)
    //             paymentInfo.mainSumms.push(0)
    //             paymentInfo.percentSumms.push(everyMonthPayment)
    //             paymentInfo.dates.push(`${months[curMonth]} ${curYear}`)
    //             curMonth++
    //             if (curMonth === 12) {
    //                 curMonth = 0
    //                 curYear++
    //             }
    //         }
    //         paymentInfo.summs[paymentInfo.summs.length - 1] += +sumSlider.value
    //         paymentInfo.mainSumms[paymentInfo.mainSumms.length - 1] = +sumSlider.value
    //         paymentInfo.finalSum = +sumSlider.value + percentSum
    //         paymentInfo.mainFinalSum = +sumSlider.value
    //         paymentInfo.percentFianlSum = percentSum
    //     } else {
    //         everyMonthPaymentElement.textContent = sumSliderMonthly.value
    //         const sumOnFullTime = rounded(sumSliderMonthly.value * monthSlider.value / 0.18)
    //         resultSum.textContent = rusNumber(sumOnFullTime)
    //         const date = new Date()
    //         let curMonth = date.getMonth()
    //         let curYear = date.getFullYear()
    //         for (let i = 0; i < monthSlider.value; i++) {
    //             paymentInfo.summs.push(+sumSliderMonthly.value)
    //             paymentInfo.mainSumms.push(0)
    //             paymentInfo.percentSumms.push(+sumSliderMonthly.value)
    //             paymentInfo.dates.push(`${months[curMonth]} ${curYear}`)
    //             curMonth++
    //             if (curMonth === 12) {
    //                 curMonth = 0
    //                 curYear++
    //             }
    //         }
    //         paymentInfo.summs[paymentInfo.summs.length - 1] += sumOnFullTime
    //         paymentInfo.mainSumms[paymentInfo.mainSumms.length - 1] = sumOnFullTime
    //         paymentInfo.finalSum = sumOnFullTime + monthSlider.value * sumSliderMonthly.value
    //         paymentInfo.mainFinalSum = sumOnFullTime
    //         paymentInfo.percentFianlSum = monthSlider.value * sumSliderMonthly.value
    //     }
    // }

    const rusNumber = (number) => {
        return (number / 1).toLocaleString('ru-RU')
    }

    // const fiilPaymentSchedule = () => {
    //     scheduleList.innerHTML = ''
    //     for (let i = 0; i < paymentInfo.dates.length; i++) {
    //         scheduleList.innerHTML += `
    //         <ul class="schedule__row">
    //             <li class="schedule__item">${i + 1}</li>
    //             <li class="schedule__item">${paymentInfo.dates[i]}</li>
    //             <li class="schedule__item">${rusNumber(rounded(paymentInfo.summs[i]))}</li>
    //             <li class="schedule__item">${rusNumber(rounded(paymentInfo.mainSumms[i]))}</li>
    //             <li class="schedule__item">${rusNumber(rounded(paymentInfo.percentSumms[i]))}</li>
    //         </ul>
    //         `
    //     }
    //     scheduleFooter.children[1].textContent = rusNumber(rounded(paymentInfo.finalSum))
    //     scheduleFooter.children[2].textContent = rusNumber(rounded(paymentInfo.mainFinalSum))
    //     scheduleFooter.children[3].textContent = rusNumber(rounded(paymentInfo.percentFianlSum))
    // }

    // sum credit slider
    const sumSliderHandler = () => {
        lineSliderHandler(sumSlider, sumSliderLine, 40_000_000)
        digitSliderHandler(currentSum, sumSlider.value)
        digitSliderHandler(resultSum, sumSlider.value)
        createPaymentScheduleInfo()
    }

    // sum payment slider
    const sumSliderMonthlyPayment = () => {
        lineSliderHandler(sumSliderMonthly, sumSliderLineMonthly, 1_000_000)
        digitSliderHandler(currentSumMonthly, sumSliderMonthly.value)
        digitSliderHandler(everyMonthPaymentElement, sumSliderMonthly.value)
        createPaymentScheduleInfo()
    }

    // month slider
    const monthSliderHandler = () => {
        lineSliderHandler(monthSlider, monthSliderLine, 120)
        digitSliderHandler(currentMonth, monthSlider.value)
        createPaymentScheduleInfo()
    }

    // handlers
    sumSlider.addEventListener('input', sumSliderHandler)
    sumSlider.addEventListener('change', sumSliderHandler)
    sumSliderMonthly.addEventListener('input', sumSliderMonthlyPayment)
    sumSliderMonthly.addEventListener('change', sumSliderMonthlyPayment)
    monthSlider.addEventListener('input', monthSliderHandler)
    monthSlider.addEventListener('change', monthSliderHandler)
    // scheduleButton.addEventListener('click', () => {
    //     loadData()
    //     fiilPaymentSchedule()
    //     body.classList.add('body-lock')
    //     scheduleSection.classList.remove('schedule-closed')
    // })
    // scheduleExit.addEventListener('click', () => {
    //     body.classList.remove('body-lock')
    //     scheduleSection.classList.add('schedule-closed')
    // })

    createPaymentScheduleInfo()
    
    lineSliderHandler(sumSliderMonthly, sumSliderLineMonthly, 1_000_000)
    lineSliderHandler(monthSlider, monthSliderLine, 120)
    lineSliderHandler(sumSlider, sumSliderLine, 40_000_000)

    // input.addEventListener('input', () => {
    //     const regExp = /[^0-9]/g
    //     if (input.value.match(regExp)) {
    //         input.value = input.value.replace(regExp, "")
    //     }
      
    //     console.log((+input.value).toLocaleString())
    //     input.value = (+input.value).toLocaleString()
    //     console.log(input.value.length)
    //   })
}
document.addEventListener('DOMContentLoaded', () => {
    dropListInit()
    // phoneInit()
    formInit()
    rangeSlidersInit()
    swiperInit()
    callInit()
})
function swiperInit() {
    const swiper = new Swiper('.swiper', {
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
        },
        autoHeight: true,
        loop: true,
        breakpoints: {
            0:{
                slidesPerView: 1,
                spaceBetween: 48
            },
            1180: {
                slidesPerView: 3,
                spaceBetween: 48,
            },
            1480:{
                slidesPerView: 3,
                spaceBetween: 64,
            }
        }
    })
}