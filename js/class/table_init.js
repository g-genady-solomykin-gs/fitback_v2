class TradeTable {
  constructor(app) {
    this.app = app;
    this.maxActiveButtons = 3;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      const containers = this.app.querySelectorAll('.table__row-item.hashtags');
      containers.forEach(container => {
        container.addEventListener('click', (event) => this.handleButtonClick(event, container));
      });

      const starItems = this.app.querySelectorAll('.table__row-item-star');
      starItems.forEach(item => {
        item.addEventListener('click', (event) => this.toggleStarClass(event, item));
      });

      this.setupSpanToggle();
    });
  }

  handleButtonClick(event, container) {
    const clickedButton = event.target;

    if (clickedButton.classList.contains('isActive') && clickedButton.classList.contains('disable')) {
      return;
    }

    if (!clickedButton.classList.contains('table__row-item-btn')) return;

    const activeButtons = container.querySelectorAll('.table__row-item-btn.active');

    if (clickedButton.classList.contains('active')) {
      this.deactivateButton(clickedButton, container);
      return;
    }

    if (activeButtons.length < this.maxActiveButtons) {
      this.activateButton(clickedButton);
    }

    if (container.querySelectorAll('.table__row-item-btn.active').length === this.maxActiveButtons) {
      this.deactivateOtherButtons(container);
    }

    container.prepend(clickedButton);
  }

  activateButton(button) {
    const currentColor = window.getComputedStyle(button).color;
    button.classList.add('active');
    button.style.backgroundColor = currentColor;
    button.style.color = 'black';
  }

  deactivateButton(button, container) {
    button.classList.remove('active');
    const originalColor = button.style.borderColor;
    button.style.backgroundColor = 'transparent';
    button.style.color = originalColor;
    this.enableInactiveButtons(container);
  }

  deactivateOtherButtons(container) {
    container.querySelectorAll('.table__row-item-btn:not(.active)').forEach(button => {
      button.classList.add('isActive', 'disable');
    });
  }

  enableInactiveButtons(container) {
    const activeButtons = container.querySelectorAll('.table__row-item-btn.active');
    if (activeButtons.length < this.maxActiveButtons) {
      container.querySelectorAll('.table__row-item-btn.isActive.disable').forEach(button => {
        button.classList.remove('isActive', 'disable');
      });
    }
  }
  toggleStarClass(event, item) {
    item.classList.toggle('active-star');
  }

  setupSpanToggle() {
    const spans = this.app.querySelectorAll('.switch-and-search-wrapper__select-toggle span');
    spans.forEach(span => {
      span.addEventListener('click', () => {
        spans.forEach(s => s.classList.remove('active'));
        span.classList.add('active');
      });
    });
  }
}

const app = document.getElementById('init__trade');
const tradeTable = new TradeTable(app);







function openPopup(element, event) {
  if (!event) return;

  const popup = element.nextElementSibling;

  if (element.classList.contains('active-missile') && event.button === 0) {
    return;
  }

  if (popup) {
    if (popup.style.display === 'block') {
      popup.style.display = 'none';
    } else {
      const allPopups = document.querySelectorAll('.popup');
      allPopups.forEach(p => p.style.display = 'none');

      popup.style.display = 'block';
    }
  }

  if (event.button === 2) {
    event.preventDefault();
  }
}

function toggleButton(input) {
  const button = input.closest('.controll-popup').querySelector('.submitButton');
  button.disabled = input.value.trim() === '';
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('submitButton')) {
    const popup = event.target.closest('.popup');
    if (popup) {
      const missileElement = popup.previousElementSibling;
      if (missileElement && missileElement.classList.contains('table__row-item-missile')) {
        missileElement.classList.add('active-missile');
      }
      popup.style.display = 'none';
    }
  }

  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    if (!popup.contains(event.target) && popup.previousElementSibling !== event.target) {
      popup.style.display = 'none';
    }
  });
});

document.addEventListener('contextmenu', function (event) {
  const target = event.target;
  if (target.classList.contains('table__row-item-missile')) {
    openPopup(target, event);
  }
});
