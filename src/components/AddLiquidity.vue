<template>
  <div class="swap-container">
    <!-- <div class="center">
      <h2>Swap</h2>
        <form>
          <label for="fname">From</label>
          <br>
          <input type="number" id="fname" name="firstname" placeholder="0.0">
          <br>

          <label for="lname">To</label>
          <br>
          <input type="number" id="lname" name="lastname" placeholder="0.0">
          <br>
        
          <input type="submit" value="Connect Wallet">
        </form>
    </div> -->

    <section id="banner" class="container-fluid bg">
		<section class="row justify-content-center">
			<section class="col-12 col-sm-6 col-md-3">
				<form class="form-container col-12">
				<div class="form-group row">
					<div class="input-group col-md-10 grp">
						<h4>Add liquidity</h4>
					</div>
					<div class="col-md-2 grp">
						<!-- <h3 class="glyphicon glyphicon-asterisk"></h3> -->
            <span>
                <svg id="Layer_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m272.066 512h-32.133c-25.989 0-47.134-21.144-47.134-47.133v-10.871c-11.049-3.53-21.784-7.986-32.097-13.323l-7.704 7.704c-18.659 18.682-48.548 18.134-66.665-.007l-22.711-22.71c-18.149-18.129-18.671-48.008.006-66.665l7.698-7.698c-5.337-10.313-9.792-21.046-13.323-32.097h-10.87c-25.988 0-47.133-21.144-47.133-47.133v-32.134c0-25.989 21.145-47.133 47.134-47.133h10.87c3.531-11.05 7.986-21.784 13.323-32.097l-7.704-7.703c-18.666-18.646-18.151-48.528.006-66.665l22.713-22.712c18.159-18.184 48.041-18.638 66.664.006l7.697 7.697c10.313-5.336 21.048-9.792 32.097-13.323v-10.87c0-25.989 21.144-47.133 47.134-47.133h32.133c25.989 0 47.133 21.144 47.133 47.133v10.871c11.049 3.53 21.784 7.986 32.097 13.323l7.704-7.704c18.659-18.682 48.548-18.134 66.665.007l22.711 22.71c18.149 18.129 18.671 48.008-.006 66.665l-7.698 7.698c5.337 10.313 9.792 21.046 13.323 32.097h10.87c25.989 0 47.134 21.144 47.134 47.133v32.134c0 25.989-21.145 47.133-47.134 47.133h-10.87c-3.531 11.05-7.986 21.784-13.323 32.097l7.704 7.704c18.666 18.646 18.151 48.528-.006 66.665l-22.713 22.712c-18.159 18.184-48.041 18.638-66.664-.006l-7.697-7.697c-10.313 5.336-21.048 9.792-32.097 13.323v10.871c0 25.987-21.144 47.131-47.134 47.131zm-106.349-102.83c14.327 8.473 29.747 14.874 45.831 19.025 6.624 1.709 11.252 7.683 11.252 14.524v22.148c0 9.447 7.687 17.133 17.134 17.133h32.133c9.447 0 17.134-7.686 17.134-17.133v-22.148c0-6.841 4.628-12.815 11.252-14.524 16.084-4.151 31.504-10.552 45.831-19.025 5.895-3.486 13.4-2.538 18.243 2.305l15.688 15.689c6.764 6.772 17.626 6.615 24.224.007l22.727-22.726c6.582-6.574 6.802-17.438.006-24.225l-15.695-15.695c-4.842-4.842-5.79-12.348-2.305-18.242 8.473-14.326 14.873-29.746 19.024-45.831 1.71-6.624 7.684-11.251 14.524-11.251h22.147c9.447 0 17.134-7.686 17.134-17.133v-32.134c0-9.447-7.687-17.133-17.134-17.133h-22.147c-6.841 0-12.814-4.628-14.524-11.251-4.151-16.085-10.552-31.505-19.024-45.831-3.485-5.894-2.537-13.4 2.305-18.242l15.689-15.689c6.782-6.774 6.605-17.634.006-24.225l-22.725-22.725c-6.587-6.596-17.451-6.789-24.225-.006l-15.694 15.695c-4.842 4.843-12.35 5.791-18.243 2.305-14.327-8.473-29.747-14.874-45.831-19.025-6.624-1.709-11.252-7.683-11.252-14.524v-22.15c0-9.447-7.687-17.133-17.134-17.133h-32.133c-9.447 0-17.134 7.686-17.134 17.133v22.148c0 6.841-4.628 12.815-11.252 14.524-16.084 4.151-31.504 10.552-45.831 19.025-5.896 3.485-13.401 2.537-18.243-2.305l-15.688-15.689c-6.764-6.772-17.627-6.615-24.224-.007l-22.727 22.726c-6.582 6.574-6.802 17.437-.006 24.225l15.695 15.695c4.842 4.842 5.79 12.348 2.305 18.242-8.473 14.326-14.873 29.746-19.024 45.831-1.71 6.624-7.684 11.251-14.524 11.251h-22.148c-9.447.001-17.134 7.687-17.134 17.134v32.134c0 9.447 7.687 17.133 17.134 17.133h22.147c6.841 0 12.814 4.628 14.524 11.251 4.151 16.085 10.552 31.505 19.024 45.831 3.485 5.894 2.537 13.4-2.305 18.242l-15.689 15.689c-6.782 6.774-6.605 17.634-.006 24.225l22.725 22.725c6.587 6.596 17.451 6.789 24.225.006l15.694-15.695c3.568-3.567 10.991-6.594 18.244-2.304z"/><path d="m256 367.4c-61.427 0-111.4-49.974-111.4-111.4s49.973-111.4 111.4-111.4 111.4 49.974 111.4 111.4-49.973 111.4-111.4 111.4zm0-192.8c-44.885 0-81.4 36.516-81.4 81.4s36.516 81.4 81.4 81.4 81.4-36.516 81.4-81.4-36.515-81.4-81.4-81.4z"/></svg>
              </span>
					</div>
					</div>
					<div class="form-group row  group">
					<div class="input-group col-md-6 grp">
						<label for="ex1">Input</label>
						<input class="form-control" id="ex1" type="text" Placeholder="0.0">
					</div>
					<div class="col-md-6 grp">
						<h4>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 32 32" width="20px"><g fill="none" fill-rule="evenodd"><circle cx="16" cy="16" r="16" fill="#627EEA"/><g fill="#FFF" fill-rule="nonzero"><path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z"/><path d="M16.498 4L9 16.22l7.498-3.35z"/><path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z"/><path d="M16.498 27.995v-6.028L9 17.616z"/><path fill-opacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/><path fill-opacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/></g></g></svg>
              </span>
              <b>BNB</b>
            </h4>
					</div>
					</div>
          <div class="text-center">
            <span>
              <svg height="15" viewBox="0 0 448 448" width="15" xmlns="http://www.w3.org/2000/svg"><path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/></svg>
            </span>
          </div>
					<div class="form-group row  group">
					<div class="input-group col-md-6 grp">
						<label for="ex1">Input</label>
						<input class="form-control" id="ex1" type="text" Placeholder="0.0">
					</div>
					<div class="col-md-6 grp">
						<h4>
              <span>
                
              <svg height="20px" viewBox="0 0 511.96907 511.96907" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="m414.722656 55.160156c-110.910156-87.667968-271.890625-68.828125-359.5625 42.085938-87.667968 110.910156-68.828125 271.894531 42.085938 359.5625 110.910156 87.667968 271.894531 68.828125 359.5625-42.085938 87.667968-110.910156 68.828125-271.890625-42.085938-359.5625zm0 0" fill="#f0a70a"/><path d="m450.78125 235.300781c5.21875 48.875-8.007812 97.582031-37.242188 137.144531-64.1875 86.871094-187.085937 105.328126-273.957031 41.140626-44.003906-32.515626-72.570312-82.382813-78.382812-136.816407-5.214844-48.875 8.011719-97.582031 37.242187-137.144531 31.09375-42.082031 76.714844-69.539062 128.460938-77.308594 51.742187-7.769531 103.414062 5.074219 145.496094 36.171875 44.003906 32.511719 72.574218 82.378907 78.382812 136.8125zm0 0" fill="#fed22b"/><path d="m340.519531 301.871094c0-20.601563-1.9375-41.570313-22.105469-55.46875 10.867188-10.335938 16.871094-26.664063 16.871094-46.863282 0-21.597656-7.109375-37.40625-21.136718-46.976562-2.195313-1.496094-4.394532-2.800781-6.675782-3.933594.066406-.613281.101563-1.238281.101563-1.871094v-24.347656c0-9.785156-7.929688-17.714844-17.714844-17.714844-9.78125 0-17.710937 7.929688-17.710937 17.714844v19.265625c-9.460938-.398437-20.957032-.40625-35.429688-.332031v-18.933594c0-9.785156-7.929688-17.714844-17.710938-17.714844s-17.714843 7.929688-17.714843 17.714844v19.113282c-2.566407.003906-5.195313.007812-7.898438.007812-12.09375 0-21.929687 9.839844-21.929687 21.933594s9.835937 21.929687 21.929687 21.929687h5.222657v141.398438h-5.214844c-12.09375 0-21.933594 9.839843-21.933594 21.929687 0 12.09375 9.839844 21.933594 21.933594 21.933594h7.890625v18.898438c0 9.78125 7.933593 17.710937 17.714843 17.710937s17.710938-7.929687 17.710938-17.710937v-18.90625l35.429688-.003907v18.910157c0 9.78125 7.929687 17.710937 17.710937 17.710937 9.785156 0 17.714844-7.929687 17.714844-17.710937v-24.351563c0-.390625-.035157-.773437-.058594-1.160156 20.886719-9.84375 33.003906-30.660157 33.003906-62.171875zm-100.882812-121.652344c34.75 0 54.628906-3.679688 54.628906 22.808594 0 30.394531-18.523437 25.710937-54.628906 25.710937zm0 151.726562v-66.253906c43.628906 0 59.859375-5.648437 59.859375 34.726563 0 21.804687-8.917969 31.53125-28.910156 31.53125h-30.949219zm0 0" fill="#e38803"/><path d="m175.898438 413.585938c29.707031 21.945312 63.625 34.230468 97.980468 37.425781-46.222656 4.277343-94.117187-7.738281-134.292968-37.425781-44.003907-32.515626-72.578126-82.382813-78.390626-136.8125-5.207031-48.882813 8.011719-97.585938 37.25-137.148438 31.085938-42.082031 76.707032-69.539062 128.453126-77.308594 15.957031-2.398437 31.914062-2.832031 47.582031-1.371094-3.746094.351563-7.511719.800782-11.269531 1.371094-51.742188 7.769532-97.363282 35.226563-128.449219 77.308594-29.242188 39.5625-42.460938 88.265625-37.25 137.148438 5.808593 54.429687 34.382812 104.296874 78.386719 136.8125zm0 0" fill="#fdc202"/></svg>
              </span>
              <b>DICE</b>
            </h4>
					</div>
					</div>
					<button style="padding:20px; font-size:20px; font-weight:bold; border-radius:30px;" type="submit" class="btn btn-block button">Connect Wallet</button>
				</form>
			</section>
		</section>
    </section>
  </div>
</template>

<script>
export default {
  name: "AddLiquidity"
}
</script>


<style scoped lang="scss">
.swap-container {
  *:not(svg) {
    padding: 10px !important;
  }
}
.swap-container {
    border-radius: 5px;
    padding: 0px;
    padding-top: 30px;
    background: #0a3652;
}
/* body{
  background: #0a3652;
} */
.center
{
  background: #fff !important;
  width: 500px;
  margin: 100px auto;
  border-radius: 2%;
}
div {
  border-radius: 5px;
  padding: 20px;
}

input[type=number], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #0a3652;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #0a3652;
}


* {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
}

#banner {
    background-color: #0A3652;
    position: relative;
}

#banner div.container {
    position: relative;
    background-position: center;
    background-size: 90%;
    background-repeat: no-repeat;
    /* background-image: url('../images/bgImage.svg'); */
    height: 100vh;
}

#banner #currentsBets {
    position: absolute;
    width: 250px;
    height: 600px;
    background-color: #070c1173;
    border: #B31E1E 2px solid;
    border-radius: 25px;
    top: 80PX;
    left: 20PX;
    z-index: 10; 
}

#banner #currentsBets::before {
    position: absolute;
    content: "Current Bets";
    width: 170px;
    padding: 10px 0;
    background-color: #B31E1E;
    left: 0;
    right: 0;
    top: -40px;
    margin: 0 auto;
    border-radius: 10px 10px 0 0;
    color: #fff;
    font-size: 17px;
    text-align: center;
}

#banner #pastRecord {
    position: absolute;
    width: 250px;
    height: 600px;
    background-color: #070c1173;
    border: #B31E1E 2px solid;
    border-radius: 25px;
    top: 80PX;
    right: 20PX;
    z-index: 10;
}

#banner #pastRecord::before {
    position: absolute;
    content: "Past Record";
    width: 170px;
    padding: 10px 0;
    background-color: #B31E1E;
    left: 0;
    right: 0;
    top: -40px;
    margin: 0 auto;
    border-radius: 10px 10px 0 0;
    color: #fff;
    font-size: 17px;
    text-align: center;
}

#block {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid #B31E1E;
    box-sizing: border-box;
    border-radius: 10px;
    left: 0;
    bottom: 20px;
    width: 350px;
    height: 165px;
    padding: 15px;
    text-align: center; 
}

#block div.blockHead {
    display: flex;
    justify-content: space-between;
}

#block div.blockHead .eso {
    font-size: 15px;
    color: #fff;
    padding: 5px 15px;
    text-decoration: none;
    background-color: #4D0759;
    border-radius: 5px;
}

#block div.blockHead .hashtag {
    font-size: 15px;
    color: #ECC73F;
    text-decoration: none;
}

#banner #block table {
    width: 100%;

}

#banner #block table tr th {
    color: rgb(107, 107, 107);
    font-weight: normal;
    padding: 10px 0;
    border-bottom: rgb(107, 107, 107) 1px solid;
}


#bet {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid #ADAFB8;
    box-sizing: border-box;
    border-radius: 10px;
    right: 0;
    bottom: 20px;
    width: 350px;
    height: 165px;
    padding: 15px;
    text-align: center; 
}

#bet h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #C4C4C4;
    padding: 12px 20px;
    background-color: black;
    border-radius: 6px;
    text-align: center;
}

#bet a {
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    color: #AA4813;
    text-decoration: none;
    display: inline-block;
    margin: 20px 20px 0 0;
}

#bet a.clearBtn {
    background: linear-gradient(180deg, #FAE2B7 0%, #D9691D 52.43%, #E7912B 100%);
    border: 6px solid #D05614;
    border-radius: 120px;
    padding: 10px 25px;

}

#bet a.betBtn {
    color: #5AF0B1;
    background: linear-gradient(180deg, #97DF58 0%, #3A9A09 52.43%, #60C70D 100%);
    border: 6px solid #378605;
    border-radius: 120px;
    padding: 10px 50px;
    margin-right: 0;
}

#bet h3 span {
    color: #D1D32A
}
.bg{
	
	width:100%;
	height:100vh;
}
.form-container{
	position:absolute;
	top:10vh;
	background: #fff;
	padding:36px;
	border-radius:20px;
	box-shadow: 0px 0px 10px 0px #000;
}
.grp input{
	padding:20px;
	border:1px white;
	font-size:20px;
	color:black;
}
.group{
	background: #fff;
	padding:15px;
	border-radius:10px;
	border: 1px solid #F5F5F6;
}
.text
{
	font-size:16px;
}
.button{
	background: #FCEAF0;
	color: #FF5A9C;
	
}

</style>
