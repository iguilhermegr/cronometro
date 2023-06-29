window.onload = function () {
  var divCronometro = document.getElementById("cronometro");
  var btnIniciar = document.getElementById("iniciar");
  var btnParar = document.getElementById("parar");
  var btnZerar = document.getElementById("zerar");
  var intervaloSegundos = document.getElementById("intervaloAlarme");
  new Cronometro(divCronometro, btnIniciar, btnParar, btnZerar, intervaloAlarmeMinutos, intervaloAlarmeSegundos);
}

var Cronometro = function (div, btnIniciar, btnParar, btnZerar, inputIntervaloMinutos, inputIntervaloSegundos) {
  var este = this;
  this.estado = null;
  this.hora = 0;
  this.minuto = 0;
  this.segundo = 0;
  this.intervaloAlarmeMinutos = 0;
  this.intervaloAlarmeSegundos = 0;
  this.start = false;

  // Adicionando elementos de aúdio para o alarme
  this.audio = document.createElement('audio');
  this.sourceAudio = document.createElement('source');
  this.sourceAudio.setAttribute('src', 'http://www.online-clockalarm.com/sounds/sound3.mp3');
  this.sourceAudio.setAttribute('type', 'audio/mp3');
  this.audio.appendChild(this.sourceAudio);

  this.atualizar = function () {
    var str = (este.hora < 10 ? "0" +
      este.hora : este.hora) + ":" +
      (este.minuto < 10 ? "0" + este.minuto : este.minuto) + ":" +
      (este.segundo < 10 ? "0" + este.segundo : este.segundo);
    div.innerHTML = str;
  }
  // Função pra iniciar o cronômetro
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
  }
  // Função para parar o cronômetro
  this.parar = function () {
    clearInterval(este.estado);
    este.start = false;
  }
  // Função para zerar o cronômetro
  this.zerar = function () {
    este.hora = 0;
    este.minuto = 0;
    este.segundo = 0;
    este.atualizar();
  }
  // Funções para setar o intervalo do alarme
  this.setIntervaloAlarmeMinutos = function (minutos) {
    este.intervaloAlarmeMinutos = minutos;
  }
  this.setIntervaloAlarmeSegundos = function (segundos) {
    este.intervaloAlarmeSegundos = segundos;
  }
  // Função para verificar se o alarme deve ser disparado
  this.verificaAlarme = function () {
    if (este.intervaloAlarmeMinutos != 0 || este.intervaloAlarmeSegundos != 0) {
      var segundosTotais = este.hora * 3600 + este.minuto * 60 + este.segundo;
      var intervaloAlarmeSegundosTotais = parseInt(este.intervaloAlarmeMinutos * 60) + parseInt(este.intervaloAlarmeSegundos);
      if (segundosTotais % intervaloAlarmeSegundosTotais == 0) {
        este.audio.play();
      };
    }
  }

  // Adicionando eventos
  if (document.addEventListener) {
    inputIntervaloSegundos.addEventListener("change", function () {
      este.setIntervaloAlarmeSegundos(inputIntervaloSegundos.value);
    });
    inputIntervaloMinutos.addEventListener("change", function () {
      este.setIntervaloAlarmeMinutos(inputIntervaloMinutos.value);
    });
    btnIniciar.addEventListener("click", function () {
      este.iniciar();
    });
    btnParar.addEventListener("click", function () {
      este.parar();
    });
    btnZerar.addEventListener("click", function () {
      este.zerar();
    });

  } else {
    inputIntervaloMinutos.addAttachEvent("onChange", function () {
      este.setIntervaloAlarmeMinutos(inputIntervaloMinutos.value);
    });
    inputIntervaloSegundos.addAttachEvent("onChange", function () {
      este.setIntervaloAlarmeSegundos(inputIntervaloSegundos.value);
    });
    btnIniciar.addAttachEvent("onClick", function () {
      este.iniciar();
    });
    btnParar.addAttachEvent("onClick", function () {
      c.parar();
    });
    btnZerar.addAttachEvent("onClick", function () {
      c.zerar();
    });
  }
};

// Atalhos de tecla
window.addEventListener('keydown', (e) => {
  if (e.key == 'i') {
    document.getElementById('iniciar').click();
  }
  if (e.key == 'p') {
    document.getElementById('parar').click();
  }
  if (e.key == 'z') {
    document.getElementById('zerar').click();
  }
});
