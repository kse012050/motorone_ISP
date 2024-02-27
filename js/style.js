$(document).ready(function(){
    // 드랍박스
    $('[data-dropDown]').length && dropDown()

    // 팝업
    $(`[data-popupOpen], [data-authenticate]`).length && popup()

    // 팝업 - 인증
    $(`[data-authenticate]`).length && popupAuthenticate()

    // 셀렉트 
    $('.selectBox').length && select()

    // 전체 동의 체크박스
    $('#allCheck').length && allCheck()

    // 입력 유효성 검사
    $('[data-formet]').length && inputFormet()
    
})


// 드랍박스
function dropDown(){
    $('[data-dropDown]').click(function(){
        const attrName = $(this).attr('data-dropDown');
        $(`[data-drop="${attrName}"]`).slideToggle()
    })
}

// 팝업
function popup(){
    $(`[data-popupOpen]`).click(function(){
        const attrName = $(this).attr('data-popupOpen');
        $(`[data-popup="${attrName}"]`).addClass('active')
    })

    $(`.popupContainer > div`).click(function(e){
        e.stopPropagation()
    })
    
    $(`.popupContainer, .popupContainer > div button`).click(function(){
        $(`.popupContainer`).removeClass('active')
    })
}

// 팝업 - 인증
function popupAuthenticate(){
    // 휴대폰 인증 번호 전송
    $('[data-sandOpen]').click(function(){
        const attrName = $(this).attr('data-sandOpen');
        $(`[data-sand="${attrName}"]`).addClass('active')
        // 인증번호 입력 리스트 제거 코드
        // $('[data-sand="mobile"]').removeClass('active')
    })

    // 휴대폰 인증
    $('[data-authenticate="mobile"]').click(function(){
        // 인증 성공
        $('[data-mobile="complete"]').addClass('active')
        // 인증 실패
        // $('[data-mobile="fail"]').addClass('active')
        // 인증 횟수 초과
        // $('[data-mobile="over"]').addClass('active')
    })

    // 차대번호 인증
    $('[data-authenticate="carNumb"]').click(function(){
        // 인증 성공
        $('[data-carNumb="complete"]').addClass('active')
        // 인증 실패
        // $('[data-carNumb="fail"]').addClass('active')

    })

}

// 전체 동의 체크박스
function allCheck(){
    const checkList = $('[type="checkbox"]:not(#allCheck)');
    const checkArray = $('[type="checkbox"]:not(#allCheck)').get()
    $('#allCheck').click(function(e){
        const { checked } = e.target;
        checkList.prop("checked", checked);
    })
    checkList.click(function(){
        $('#allCheck').prop('checked', checkArray.every((data)=>data.checked))
    })
}

// 입력 유효성 검사
function inputFormet(){
    $('[data-formet="numb"]').on('input',function(e){
        const { value } = e.target
        
        if(!/^[0-9]+$/.test(value)){
            const cur = e.target.selectionStart - 1;
            e.target.value = value.replace(/\D/g, '')
            e.target.setSelectionRange(cur, cur);
        }
    })

    // 인증 버튼 숨기기
    $('input:has(+ [data-hidden])').on('input',function(e){
        const { maxLength } = e.target
        if(e.target.value.length === maxLength){
            $(this).next(['data-hidden']).fadeIn()
        }else{
            $(this).next(['data-hidden']).fadeOut()
        }
    })
}


// 셀렉트 
function select(){
    $('body, .selectBox div button').click(function(){
        $('.selectBox').removeClass('active')
    })
    $('.selectBox').click(function(e){
        e.stopPropagation()
        $(this).addClass('active')
    })
    $('.selectBox div button').click(function(e){
        e.stopPropagation()
        const value = $(this).attr('data-value')
        const attrName = $(this).closest('.selectBox').attr('data-selectName')
        $(`[data-select="${attrName}"]`).val(value)
        $(this).closest('.selectBox').children('button').html($(this).html())
    })
}