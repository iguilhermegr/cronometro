window.onload = function () {
  var divCronometro = document.getElementById("cronometro");
  var btnIniciar = document.getElementById("iniciar");
  var btnPausar = document.getElementById("pausar");
  var btnReiniciar = document.getElementById("reiniciar");
  var inputIntervaloMinutos = document.getElementById("intervaloAlarmeMinutos");
  var inputIntervaloSegundos = document.getElementById("intervaloAlarmeSegundos");
  new Cronometro(divCronometro, btnIniciar, btnPausar, btnReiniciar, inputIntervaloMinutos, inputIntervaloSegundos);
};

var Cronometro = function (div, btnIniciar, btnPausar, btnReiniciar, inputIntervaloMinutos, inputIntervaloSegundos) {
  var este = this;
  this.estado = null;
  this.hora = 0;
  this.minuto = 0;
  this.segundo = 0;
  this.intervaloAlarmeMinutos = 0;
  this.intervaloAlarmeSegundos = 0;
  this.start = false;

  // Adicionando elementos de áudio para o alarme
  this.audio = document.createElement('audio');
  this.sourceAudio = document.createElement('source');
  this.sourceAudio.setAttribute('src', '../src/audio/alarme.wav');
  this.audio.appendChild(this.sourceAudio);

  this.atualizar = function () {
    var str = (este.hora < 10 ? "0" + este.hora : este.hora) + ":" +
      (este.minuto < 10 ? "0" + este.minuto : este.minuto) + ":" +
      (este.segundo < 10 ? "0" + este.segundo : este.segundo);
    div.innerHTML = str;
  };

  this.iniciar = function () {
    if (!este.start) {
      este.estado = setInterval(function () {
        este.segundo += 1;
        if (este.segundo % 60 == 0) {
          este.segundo = 0;
          este.minuto += 1;
        }
        if (este.minuto % 60 == 0 && este.minuto > 0) {
          este.minuto = 0;
          este.hora += 1;
        }
        este.atualizar();
        este.verificaAlarme();
      }, 1000);
      este.start = true;
    }
  };

  this.pausar = function () {
    clearInterval(este.estado);
    este.start = false;
  };

  this.reiniciar = function () {
    este.hora = 0;
    este.minuto = 0;
    este.segundo = 0;
    este.atualizar();
  };

  this.setIntervaloAlarmeMinutos = function (minutos) {
    este.intervaloAlarmeMinutos = minutos;
  };

  this.setIntervaloAlarmeSegundos = function (segundos) {
    este.intervaloAlarmeSegundos = segundos;
  };

  this.verificaAlarme = function () {
    if (este.intervaloAlarmeMinutos == este.minuto && este.intervaloAlarmeSegundos == este.segundo) {
      este.audio.play();
      este.pausar();
    }
  };
  este.setIntervaloAlarmeMinutos(inputIntervaloMinutos.value);
  este.setIntervaloAlarmeSegundos(inputIntervaloSegundos.value);

  btnIniciar.addEventListener("click", function () {
    este.iniciar();
  });
  btnPausar.addEventListener("click", function () {
    este.pausar();
  });
  btnReiniciar.addEventListener("click", function () {
    este.reiniciar();
  });
};

window.addEventListener('keydown', (e) => {
  if (e.key == 'i') {
    document.getElementById('iniciar').click();
  }
  if (e.key == 'p') {
    document.getElementById('pausar').click();
  }
  if (e.key == 'r') {
    document.getElementById('reiniciar').click();
  }
});
