import { createRoot } from 'react-dom/client';

<div id="root"></div>
export default function test(){
//if(typeof window !== 'undefined'){
	if (typeof window === 'object') {
		// Check if document is finally loaded
		   document.addEventListener("DOMContentLoaded", function () {
			   alert('Finished loading')
			 });
		  }
const domNode = document?.getElementById('root') as HTMLElement;
const root = createRoot(domNode);


let test = ['1', '2', '3']
  
function tick() {
  const element = (
    <main id='carou' className="flex flex-col items-center justify-center">
			<div className="flex flex-col items-center">
				<div className="font-head text-5xl lowercase mb-4">
				Bienvenue sur <span className="font-thin text-primary-1">jade</span>
				</div>
				<div className="carousel-section">
          <div > {test}</div>
				</div>
				<a href="/test">Aller à la page de test</a>
			</div>
			
		</main>
  );
  root.render(element);
}

setInterval(tick, 1000);
}
//}