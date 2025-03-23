document.addEventListener('DOMContentLoaded', async function() {
    try {
        // 데이터 로드
        const response = await fetch('data/members.json');
        const data = await response.json();
        
        // 데이터 분석 함수 호출
        renderDashboard(data);
    } catch (error) {
        console.error('데이터 로딩 중 오류 발생:', error);
    }
});

function renderDashboard(data) {
    const members = data.members;
    
    // 회원 통계 차트
    renderMemberChart(members);
    
    // 연도별 참여 횟수 차트
    renderYearlyParticipationChart(members);
    
    // 연도별 평균 스코어 차트
    renderYearlyScoreChart(members);
    
    // 월별 참여 횟수 차트
    renderMonthlyParticipationChart(members);
    
    // 월별 평균 스코어 차트
    renderMonthlyScoreChart(members);
    
    // 최고 성적 표 생성
    renderTopPlayersTable(members);
}

// 회원 통계 차트 렌더링
function renderMemberChart(members) {
    const maleCount = members.filter(member => member.gender === "남성").length;
    const femaleCount = members.filter(member => member.gender === "여성").length;

    const ctx = document.getElementById('memberChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['남성', '여성'],
            datasets: [{
                data: [maleCount, femaleCount],
                backgroundColor: ['#3498db', '#e74c3c']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '성별 회원 분포'
                }
            }
        }
    });
}

// 다른 차트 렌더링 함수들 (유사한 방식으로 구현)
// ...

// 최고 성적 표 렌더링
function renderTopPlayersTable(members) {
    // 최고 성적 계산 로직
    const bestScoresByMember = [];
    members.forEach(member => {
        let bestScore = 999;
        let yearWithBestScore = "";
        
        Object.keys(member.records).forEach(year => {
            if (member.records[year].best_score && member.records[year].best_score < bestScore) {
                bestScore = member.records[year].best_score;
                yearWithBestScore = year;
            }
        });
        
        if (bestScore < 999) {
            bestScoresByMember.push({
                name: member.name,
                gender: member.gender,
                cohort: member.cohort,
                bestScore,
                year: yearWithBestScore
            });
        }
    });

    const top10Players = bestScoresByMember
        .sort((a, b) => a.bestScore - b.bestScore)
        .slice(0, 10);

    const table = document.getElementById('topPlayersTable').getElementsByTagName('tbody')[0];
    
    top10Players.forEach((player, index) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = player.name;
        row.insertCell(2).textContent = player.bestScore + '타';
        row.insertCell(3).textContent = player.gender;
        row.insertCell(4).textContent = player.cohort + '기';
        row.insertCell(5).textContent = player.year + '년';
    });
}
