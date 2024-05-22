(()=>{"use strict";let e=document.querySelectorAll('input[type="radio"]'),t=(document.getElementById("identity"),document.getElementById("blur")),n=document.getElementById("sharpen"),o=document.getElementById("gaussian"),l=document.querySelectorAll("#kernel");function a(e){const t=document.getElementById("image"),n=t.getContext("2d"),o=Math.floor(1.5);let a=function(){const e=[];return l.forEach(((t,n)=>{e.push(parseFloat(t.value)||0)})),e}(),c=[[a[0],a[1],a[2]],[a[3],a[4],a[5]],[a[6],a[7],a[8]]];console.log(c);const d=new Uint8ClampedArray(e.data.buffer);console.log(d);const i=n.createImageData(t.width,t.height),r=new Uint8ClampedArray(i.data.buffer);for(let e=0;e<t.height;e+=1)for(let n=0;n<t.width;n+=1){let l=0,a=0,i=0;for(let r=0;r<3;r+=1){const u=Math.min(t.height-1,Math.max(0,e+r-o));for(let e=0;e<3;e+=1){const m=Math.min(t.width-1,Math.max(0,n+e-o)),s=4*(u*t.width+m);l+=d[s]*c[r][e],a+=d[s+1]*c[r][e],i+=d[s+2]*c[r][e]}}const u=4*(e*t.width+n),m=d[u+3];l=Math.min(255,Math.max(0,0+l/16)),a=Math.min(255,Math.max(0,0+a/16)),i=Math.min(255,Math.max(0,0+i/16)),r[u]=l,r[u+1]=a,r[u+2]=i,r[u+3]=m}console.log(r),n.putImageData(i,0,0)}e.forEach((c=>{c.addEventListener("change",(function(){let c;e.forEach((e=>{e!==this&&(e.checked=!1)})),t.checked&&(c=[1,1,1,1,1,1,1,1,1]),n.checked&&(c=[0,-1,0,-1,5,-1,0,-1,0]),o.checked&&(c=[1,2,1,2,4,2,1,2,1]),c.forEach(((e,t)=>{l[t].value=e})),a(getImageDataS(img))}))})),document.addEventListener("DOMContentLoaded",(()=>{let e=document.getElementById("callback-button"),t=document.getElementById("close-button"),n=(document.getElementById("reset-button"),document.getElementById("modal-1")),o=(document.getElementById("sub"),document.getElementById("scale-button")),l=document.getElementById("curves-button"),c=document.getElementById("curves-dialog"),d=document.getElementById("filter-button"),i=document.getElementById("filter-dialog"),u=document.getElementById("close-filter"),m=document.getElementById("close-curves"),s=document.getElementById("scale-dialog"),h=document.getElementById("close-dialog"),v=document.getElementById("save-button"),y=document.getElementById("numWidth"),f=document.getElementById("numHeight"),x=document.getElementById("measure"),E=document.getElementById("key"),w=document.getElementById("confirm"),I=(document.getElementById("scale-form"),document.getElementById("scale")),p=document.getElementById("color-close-button"),C=(document.getElementById("pippete"),document.getElementById("pip")),S=document.getElementById("hand"),B=(document.getElementById("container"),document.getElementById("first-in-x")),k=document.getElementById("second-in-x"),L=document.getElementById("first-out-y"),q=document.getElementById("second-out-y"),$=document.getElementById("change-button"),F=document.getElementById("confirm-curves"),M=document.getElementById("cancel-curves"),D=document.getElementById("preview");e.addEventListener("click",(e=>{e.preventDefault(),n.classList.add("modal_active")})),t.addEventListener("click",(e=>{e.preventDefault(),n.classList.remove("modal_active")}));let A=1;C.addEventListener("click",(e=>{e.preventDefault(),1==A?(document.querySelector(".pippete-color").style.display="block",document.querySelector(".pip").style.backgroundColor="gray",A=0):(A=1,document.querySelector(".pippete-color").style.display="none",document.querySelector(".pip").style.backgroundColor="#F0F0F0")}));let T=1;S.addEventListener("click",(e=>{if(e.preventDefault(),1==T){S.classList.add("active-button"),(U.clientHeight>window.screen.availHeight-81||U.clientWidth>window.screen.availWidth-81)&&(document.querySelector(".container").style.overflow="scroll"),document.querySelector(".hand").style.backgroundColor="gray";let e={marginTop:0,marginLeft:0};U.style.marginTop=e.top+"px",U.style.marginLeft=e.left+"px";let t={ArrowDown:["marginTop",5],ArrowUp:["marginTop",-5],ArrowRight:["marginLeft",5],ArrowLeft:["marginLeft",-5]};addEventListener("keydown",(function(n){if(S.classList.contains("active-button")){let o=t[n.key];o&&(e[o[0]]=e[o[0]]+o[1],"marginTop"==o[0]&&Math.abs(e[o[0]])<window.screen.availHeight/2&&(U.style[o[0]]=e[o[0]]+"px"),"marginLeft"==o[0]&&Math.abs(e[o[0]])<window.screen.availWidth/2&&(U.style[o[0]]=e[o[0]]+"px"))}})),T=0}else S.classList.remove("active-button"),T=1,document.querySelector(".container").style.overflow="hidden",document.querySelector(".hand").style.backgroundColor="#F0F0F0"})),p.addEventListener("click",(e=>{e.preventDefault(),document.querySelector(".pippete-color").style.display="none",document.querySelector(".pip").style.backgroundColor="#F0F0F0"}));const R=document.querySelector("#image-form");R.addEventListener("submit",(function(e){e.preventDefault(),n.classList.remove("modal_active"),f.value="",y.value="",I.value=100,document.querySelector(".range-value").textContent=`${I.value}%`,document.querySelector(".scale-size").textContent="";const t=[...new FormData(e.target).entries()];let o,l;R.reset(),P=new Image,""!==t[0][1].name&&(o=t[0][1],l=URL.createObjectURL(o)),""!==t[1][1]&&(o=t[1][1],l=o),P.crossOrigin="Anonymous",P.src=l;document.getElementById("image").getContext("2d"),P.onload=he}));let P="";const U=document.getElementById("image");let H,W,z,X,Y,j,O,_,G,K,Z,V,J,N,Q,ee,te,ne,oe,le,ae,ce,de;function ie(e){const t=U.getContext("2d");let n=e.offsetX,o=e.offsetY,l=t.getImageData(n,o,1,1).data;z=l[0],X=l[1],Y=l[2],alpha=l[3],rs=z/255,gs=X/255,bs=Y/255,rs<=.04045?r=rs/12.92:r=((rs+.055)/1.055)**2.4,gs<=.04045?g=gs/12.92:g=((gs+.055)/1.055)**2.4,bs<=.04045?b=bs/12.92:b=((bs+.055)/1.055)**2.4,j=100*(.49*r+.31*g+.2*b),O=100*(.177*r+.812*g+.011*b),_=100*(0*r+.01*g+.99*b),G=116*Math.cbrt(O/99.77),K=500*(Math.cbrt(j/96.2)-Math.cbrt(O/99.77)),Z=200*(Math.cbrt(O/99.77)-Math.cbrt(_/82.33))}function re(){if(H&&W){let e;e=H>=W?H/W:W/H,document.querySelector(".contrast").textContent=`${e.toFixed(2)}`,document.querySelector(".contrast_warning").textContent=e>=4.5?"Эти цвета контрастны":"Эти цвета недостаточно контрастны"}}function ue(){"px"==x.value&&(y.value=Q,f.value=ee),"%"==x.value&&(y.value=(Q/P.width*100).toFixed(),f.value=(ee/P.height*100).toFixed())}function me(){"px"==x.value&&(Q=y.value,ee=f.value),"%"==x.value&&(Q=y.value/100*P.width,ee=f.value/100*P.height)}function se(){E.checked&&("px"==x.value&&(f.value=y.value/(P.width/P.height),document.querySelector(".scale-size").textContent=`${(y.value*f.value/1e6).toFixed(2)} Mpx`),"%"==x.value&&(f.value=y.value,document.querySelector(".scale-size").textContent=`${(y.value/100*P.width*(f.value/100*P.height)/1e6).toFixed(2)} Mpx`))}function ge(e){const t=document.getElementById("image");return t.getContext("2d").getImageData(0,0,t.width,t.height)}function he(e){(function(e){const t=e.width,n=e.height;te=e.width,ne=e.height;const o=new Uint32Array(e.data.buffer);f.value&&f.value?me():(Q=e.width,ee=e.height),ue(),function(e,t,n,o){const l=document.getElementById("image");l.width=t,l.height=n;const a=l.getContext("2d"),c=a.createImageData(t,n);o(new Uint32Array(c.data.buffer)),a.putImageData(c,0,0)}(0,Q,ee,(function(e){const l=t/Q,a=n/ee;for(let n=0;n<ee;n++){let c=Math.floor(n*a);for(let a=0;a<Q;a++){let d=Math.floor(a*l);e[n*Q+a]=o[c*t+d]}}}))})(function(e){const t=document.getElementById("image"),n=t.getContext("2d");return t.width=P.width,t.height=P.height,n.drawImage(P,0,0),document.querySelector(".size").textContent=`${t.width} x ${t.height}`,n.getImageData(0,0,P.width,P.height)}()),document.querySelector(".size").textContent=`${U.width} x ${U.height}`,document.querySelector(".img-size").textContent=`${(P.width*P.height/1e6).toFixed(2)} Mpx`,U.toBlob((function(e){oe=URL.createObjectURL(e)})),te=U.width,ne=U.height,function(){let e=100;if(U.clientHeight>window.screen.availHeight-300){const t=U.clientHeight/(window.screen.availHeight-300);if(t>1)for(let n=.1;n<1;n+=.1)if(t*n>1){e=100*(n-.1);break}}if(U.clientWidth>window.screen.availWidth-100){const t=U.clientWidth/(window.screen.availWidth-100);if(t>1)for(let n=.1;n<1;n+=.1)if(t*n>1){e=100*(n-.1);break}}100==e&&100==scale||(I.value=e<=100?e:100,ve())}()}function ve(){const e=document.getElementById("image");document.querySelector(".range-value").textContent=`${I.value}%`;let t=I.value/100;const n=e.getContext("2d");e.width=te*t,e.height=ne*t,n.drawImage(P,0,0,P.width,P.height,0,0,e.width,e.height),e.scrollIntoView({block:"center",inline:"center"})}function ye(e){e.width,e.height;const t=new Uint8Array(e.data.buffer);let n=new Array(256).fill(0),o=new Array(256).fill(0),l=new Array(256).fill(0);for(let e=0;e<t.length;e+=4){let a=t[e],c=t[e+1],d=t[e+2];n[a]++,o[c]++,l[d]++}console.log(n);let a=0;for(let e=0;e<256;e++)a<n[e]?a=n[e]:a<o[e]?a=o[e]:a<l[e]&&(a=l[e]);const c=document.getElementById("canvasHistogram"),d=c.getContext("2d");let i=c.height,r=c.width/256,u=i/a;d.lineWidth=r,d.fillStyle="#fff",d.fillRect(0,0,c.width,c.height);for(let e=0;e<256;e++){let t=e*r;d.strokeStyle="rgba(220,0,0,0.5)",d.beginPath(),d.moveTo(t,i),d.lineTo(t,i-n[e]*u),d.closePath(),d.stroke(),d.strokeStyle="rgba(0,210,0,0.5)",d.beginPath(),d.moveTo(t,i),d.lineTo(t,i-o[e]*u),d.closePath(),d.stroke(),d.strokeStyle="rgba(0,0,255,0.5)",d.beginPath(),d.moveTo(t,i),d.lineTo(t,i-l[e]*u),d.closePath(),d.stroke()}d.beginPath(),d.moveTo(0,256),d.lineTo(256,0),d.stroke()}function fe(){B.value<0&&(B.value=0),B.value>255&&(B.value=255),L.value<0&&(L.value=0),L.value>255&&(L.value=255),k.value<0&&(k.value=0),k.value>255&&(k.value=255),q.value<0&&(q.value=0),q.value>255&&(q.value=255),ye(ae),$.disabled=!1}U.addEventListener("pointermove",(e=>{const t=U.getContext("2d"),n=e.offsetX,o=e.offsetY,l=t.getImageData(n,o,1,1).data,a=l[0],c=l[1],d=l[2];l[3],document.querySelector(".rgb").textContent=`R: ${a}, G: ${c}, B: ${d}`,document.querySelector(".color-real").style.backgroundColor=`rgba(${l.join(",")})`,document.querySelector(".coordinate").textContent=`X: ${n.toFixed(0)}, Y: ${o.toFixed(0)}`})),U.addEventListener("click",(e=>{e.shiftKey||(ie(e),H=.2126*r+.7152*g+.0722*b+.05,re(),document.querySelector(".R-1").textContent=`${z}`,document.querySelector(".G-1").textContent=`${X}`,document.querySelector(".B-1").textContent=`${Y}`,document.querySelector(".X-1").textContent=`${j.toFixed(1)}`,document.querySelector(".Y-1").textContent=`${O.toFixed(1)}`,document.querySelector(".Z-1").textContent=`${_.toFixed(1)}`,document.querySelector(".L-1").textContent=`${G.toFixed(1)}`,document.querySelector(".A-1").textContent=`${K.toFixed(1)}`,document.querySelector(".Bl-1").textContent=`${Z.toFixed(1)}`,document.querySelector(".color-real-1").style.backgroundColor=`rgba(${V.join(",")})`,document.querySelector(".coordinate-1").textContent=`X: ${J.toFixed(0)}, Y: ${N.toFixed(0)}`)})),U.addEventListener("click",(e=>{e.shiftKey&&(ie(e),W=.2126*r+.7152*g+.0722*b+.05,re(),document.querySelector(".R-2").textContent=`${z}`,document.querySelector(".G-2").textContent=`${X}`,document.querySelector(".B-2").textContent=`${Y}`,document.querySelector(".X-2").textContent=`${j.toFixed(1)}`,document.querySelector(".Y-2").textContent=`${O.toFixed(1)}`,document.querySelector(".Z-2").textContent=`${_.toFixed(1)}`,document.querySelector(".L-2").textContent=`${G.toFixed(1)}`,document.querySelector(".A-2").textContent=`${K.toFixed(1)}`,document.querySelector(".Bl-2").textContent=`${Z.toFixed(1)}`,document.querySelector(".color-real-2").style.backgroundColor=`rgba(${V.join(",")})`,document.querySelector(".coordinate-2").textContent=`X: ${J.toFixed(0)}, Y: ${N.toFixed(0)}`)})),v.addEventListener("click",(function(){v.setAttribute("href",oe),v.setAttribute("download",`${oe}.jpg`)})),o.addEventListener("click",(function(){s.showModal()})),x.addEventListener("change",ue),E.addEventListener("change",se),y.addEventListener("input",se),f.addEventListener("input",se),h.addEventListener("click",(function(){s.close()})),w.addEventListener("click",(function(){"px"==x.value&&(f.value>3*P.height&&(f.value=3*P.height),y.value>3*P.width&&(y.value=3*P.width)),"%"==x.value&&(f.value>300&&(f.value=300),f.value<10&&(f.value=10),y.value>300&&(y.value=300),y.value<10&&(y.value=10)),s.close(),I.value=100,he(),document.querySelector(".scale-size").textContent=`${(U.width*U.height/1e6).toFixed(2)} Mpx`,document.querySelector(".range-value").textContent=`${I.value}%`})),I.addEventListener("change",ve),l.addEventListener("click",(function(){c.showModal(),ae=ge(),ye(ae)})),d.addEventListener("click",(function(){i.showModal(),a(ge())})),D.addEventListener("change",(function(){const e=document.getElementById("image"),t=e.getContext("2d");D.checked?(t.clearRect(0,0,e.width,e.height),t.putImageData(ce,0,0)):(t.clearRect(0,0,e.width,e.height),t.putImageData(ae,0,0))})),B.addEventListener("change",fe),L.addEventListener("change",fe),k.addEventListener("change",fe),q.addEventListener("change",fe),$.addEventListener("click",(function(){!function(e){const t=document.getElementById("image"),n=t.getContext("2d"),o=new Uint8Array(e.data.buffer);ce=n.createImageData(t.width,t.height),le=ce.data;const l=B.value,a=L.value,c=k.value,d=q.value,i=(d-a)/(c-l),r=a-i*l;for(let e=0;e<o.length;e+=4)o[e]<=l?o[e]=a:o[e]>=c?o[e]=d:o[e]=i*o[e]+r,le[e]=o[e],o[e+1]<=l?o[e+1]=a:o[e+1]>=c?o[e+1]=d:o[e+1]=i*o[e+1]+r,le[e+1]=o[e+1],o[e+2]<=l?o[e+2]=a:o[e+2]>=c?o[e+2]=d:o[e+2]=i*o[e+2]+r,le[e+2]=o[e+2],le[e+3]=o[e+3];D.checked?(n.clearRect(0,0,t.width,t.height),n.putImageData(ce,0,0)):(n.clearRect(0,0,t.width,t.height),n.putImageData(ae,0,0))}(ge());const e=document.getElementById("canvasHistogram").getContext("2d"),t=B.value,n=k.value,o=L.value,l=q.value;e.strokeStyle="#000",de=new Path2D,de.moveTo(0,256-o),de.lineTo(t,256-o),de.lineTo(n,256-l),de.lineTo(256,256-l),e.stroke(de),e.fillStyle="black",e.beginPath(),e.arc(t,256-o,3,0,2*Math.PI),e.fill(),e.stroke(),e.fillStyle="black",e.beginPath(),e.arc(n,256-l,3,0,2*Math.PI),e.fill(),e.stroke(),$.disabled=!0})),F.addEventListener("click",(function(){c.close();const e=document.getElementById("image");e.getContext("2d").putImageData(ce,0,0),B.value=0,L.value=0,k.value=255,q.value=255;let t=e.toDataURL();P.src=t,P.onload=he})),M.addEventListener("click",(function(){ce=ae,ye(ae),he(),$.disabled=!0,B.value=0,L.value=0,k.value=255,q.value=255})),m.addEventListener("click",(function(){c.close(),ye(ae),he(),B.value=0,L.value=0,k.value=255,q.value=255})),u.addEventListener("click",(function(){i.close()}))}))})();