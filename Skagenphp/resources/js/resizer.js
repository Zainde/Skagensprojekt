


  function showViewPortSize(display) {
    if(display) {
      let height = window.innerHeight;
      let width = window.innerWidth;
      $('body').prepend('<div id="viewportsize" >Højde: '+height+'<br>Bredde: '+width+'</div>');
      $(window).resize(function() {
              height = window.innerHeight;
              width = window.innerWidth;
              $('#viewportsize').html('Højde: '+height+'<br>Bredde: '+width);
      });
    }
  }

  $(document).ready(function(){
     showViewPortSize(true);
  });
