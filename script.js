document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 탭 메뉴 내비게이션 기능
    const navLinks = document.querySelectorAllnav('ul li a');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // 활성화된 링크 스타일 변경
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // 대상 섹션만 보여주기
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // 2. 가이오가 각성 인터랙션 기능
    const awakenBtn = document.getElementById('awaken-btn');
    const pressureVal = document.getElementById('pressure-val');

    if (awakenBtn) {
        awakenBtn.addEventListener('click', () => {
            awakenBtn.disabled = true;
            awakenBtn.innerText = '각성 프로토콜 가동 중...';
            
            let currentPressure = 100;
            
            // 수압이 심해처럼 급격히 올라가는 연출 효과
            const interval = setInterval(() => {
                currentPressure += Math.floor(Math.random() * 80) + 40;
                pressureVal.innerText = currentPressure;
                
                if (currentPressure >= 1000) {
                    clearInterval(interval);
                    pressureVal.style.color = '#ef4444'; // 위험 경고 (빨간색)
                    pressureVal.innerText = `${currentPressure} (가이오가 눈을 뜨다!)`;
                    awakenBtn.innerText = '프로토콜 완료 - 폭우가 시작됩니다';
                    
                    // 배경 색상을 완전한 심해 흑색으로 변경하는 연출
                    document.querySelector('.ocean-bg').style.background = 'radial-gradient(circle at 50% 100%, #000000 0%, #020813 100%)';
                    
                    alert('🚨 경고: 초고대 포켓몬 가이오가가 각성했습니다! 대지에 해일과 폭우가 몰아칩니다.');
                }
            }, 150);
        });
    }
});
