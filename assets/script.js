document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - iniciando script');
    
    // Verifique se os elementos existem
    const menuMobile = document.querySelector('.menu-mobile');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuMobile || !navLinks) {
        console.error('Elementos do menu não encontrados!');
        return;
    }
    
    // Menu Mobile
    menuMobile.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
});


const menuMobile = document.querySelector('.menu-mobile');
const navLinks = document.querySelector('.nav-links');

menuMobile.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Diet Tracker 
const foodList = document.getElementById('foodList');
const addFoodBtn = document.getElementById('addFood');
const foodNameInput = document.getElementById('foodName');
const caloriesInput = document.getElementById('calories');
const proteinsInput = document.getElementById('proteins');
const carbsInput = document.getElementById('carbs');
const fatsInput = document.getElementById('fats');

// Inicializar totais como números
let totalCals = 0;
let totalProteins = 0;
let totalCarbs = 0;
let totalFats = 0;

// Função para atualizar os totais na tela
function updateTotals() {
    document.getElementById('totalCalorias').textContent = Math.round(totalCals);
    document.getElementById('totalProteinas').textContent = totalProteins.toFixed(1) + 'g';
    document.getElementById('totalCarboidratos').textContent = totalCarbs.toFixed(1) + 'g';
    document.getElementById('totalGorduras').textContent = totalFats.toFixed(1) + 'g';
}

addFoodBtn.addEventListener('click', () => {
    const foodName = foodNameInput.value.trim();
    const calories = parseFloat(caloriesInput.value) || 0;
    const proteins = parseFloat(proteinsInput.value) || 0;
    const carbs = parseFloat(carbsInput.value) || 0;
    const fats = parseFloat(fatsInput.value) || 0;

    if (foodName && (calories > 0 || proteins > 0 || carbs > 0 || fats > 0)) {
        // Adiciona um item a lista
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-item', 'fade-in');
        foodItem.innerHTML = `
            <p>${foodName} - ${calories} kcal | ${proteins}g P | ${carbs}g C | ${fats}g G</p>
            <button class="action-button" onclick="deleteFood(this, ${calories}, ${proteins}, ${carbs}, ${fats})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        foodList.appendChild(foodItem);

        // Atualiza os totais
        totalCals += calories;
        totalProteins += proteins;
        totalCarbs += carbs;
        totalFats += fats;
        updateTotals();

        // Limpa os campos
        foodNameInput.value = '';
        caloriesInput.value = '';
        proteinsInput.value = '';
        carbsInput.value = '';
        fatsInput.value = '';
    } else {
        alert('Por favor, preencha pelo menos o nome do alimento e um valor nutricional.');
    }
});

// Função global para deletar os alimentos
window.deleteFood = function(button, calories, proteins, carbs, fats) {
    const foodItem = button.parentElement;
    foodItem.style.animation = 'fadeInUp 0.5s ease reverse';
    setTimeout(() => {
        foodItem.remove();
        totalCals -= calories;
        totalProteins -= proteins;
        totalCarbs -= carbs;
        totalFats -= fats;
        updateTotals();
    }, 500);
};

// Calculadora de taxa metabólica basal
const calcularTMBBtn = document.getElementById('calcularTMB');
const resultadoTMB = document.querySelector('.tmb-result');

calcularTMBBtn.addEventListener('click', () => {
    const idade = parseInt(document.getElementById('idade').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseInt(document.getElementById('altura').value);
    const sexo = document.getElementById('sexo').value;
    const nivelAtividade = parseFloat(document.getElementById('nivelAtividade').value);

    if (idade && peso && altura) {
        let tmb;
        if (sexo === 'masculino') {
            tmb = (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
        } else {
            tmb = (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
        }

        const necessidadeDiaria = Math.round(tmb * nivelAtividade);
        
        resultadoTMB.textContent = `${necessidadeDiaria} kcal/dia`;
        resultadoTMB.style.animation = 'none';
        resultadoTMB.offsetHeight; // Trigger reflow
        resultadoTMB.style.animation = 'fadeInUp 0.5s ease';
    }
});

// "Rolagem suave"
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Funcionalidade dos botões "Ler mais"
document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleContent = this.previousElementSibling;
            const isExpanded = articleContent.classList.contains('show');
            
            // Alterna a classe 'show' para expandir/recolher o conteúdo
            articleContent.classList.toggle('show');
            
            // Altera o texto do botão
            this.textContent = isExpanded ? 'Ler mais' : 'Ler menos';
        });
    });
}); 
