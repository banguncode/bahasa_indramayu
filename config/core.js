let rBadge = (txt = '', type = 'info') => {
    return `<span class="badge badge-pill badge-small badge-${type}">${txt}</span>`
}

let rDictionary = (data = [], lang = 'nk') => {
    let html = '';
    if (data.length) {
        data.forEach(el => {
            let t1, t2, t3;
            switch (lang) {
                case 'km':
                    t1 = el.krama;
                    t2 = `${el.ngoko} ${rBadge('Ngoko', 'secondary')}`;
                    t3 = `${el.indonesia} ${rBadge('Indonesia', 'dark')}`;
                    break;
                case 'id':
                    t1 = el.indonesia;
                    t2 = `${el.ngoko} ${rBadge('Ngoko', 'secondary')}`;
                    t3 = `${el.krama} ${rBadge('Krama', 'dark')}`;
                    break;
                default:
                    t1 = el.ngoko;
                    t2 = `${el.krama} ${rBadge('Krama', 'secondary')}`;
                    t3 = `${el.indonesia} ${rBadge('Indonesia', 'dark')}`;
                    break;
            }

            html += `<div class="col-sm-4 mb-3 dictionary">
            <div class="card border-info">
                <div class="card-body">
                    <h5 class="card-title text-info">${t1}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${t2}</h6>
                    <p class="card-text">${t3}</p>
                </div>
            </div>
        </div>`;
        });        
    }

    return html;
}

module.exports = {
    rDictionary
}