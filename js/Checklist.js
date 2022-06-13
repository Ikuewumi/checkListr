console.log('checklist');
class Checklist {
    constructor(listElement, doneElement, activeElement) {
        this.listElement = listElement;
        this.store = [];
        this.done = 0;
        this.doneElement = doneElement;
        this.activeElement = activeElement;
    }
    refreshStore() {
        this.store = Checklist.getStore();
    }
    init() {
        this.refreshStore();
        this.filterOldData();
        this.renderData();
    }
    renderData() {
        this.listElement.innerHTML = '';
        this.store.forEach(task => {
            this.listElement.innerHTML += `

            <li>
               <svg viewBox="0 0 182.993 164.156">
                  <use href="#check"></use>
               </svg>
               <span>${task === null || task === void 0 ? void 0 : task.task}</span>
            </li>

         `;
        });
        this.activeElement.textContent = `${this.store.length}`;
        this.doneElement.textContent = `${this.done}`;
    }
    removeTask(task) {
        if (!task)
            return;
        const taskElement = task.querySelector('span');
        const present = this.store.find(task => taskElement.textContent = task.task);
        if (!taskElement && !present) {
            return;
        }
        this.store = this.store.filter(task => task.task !== taskElement.textContent);
        this.persistData();
        this.done += 1;
        this.renderData();
    }
    addTask(task) {
        if (!task && task <= '')
            return;
        this.store.push({
            task,
            dateTime: Date.now(),
            isCompleted: false
        });
        this.persistData();
        this.renderData();
    }
    persistData() {
        localStorage.setItem('checkStore', JSON.stringify(this.store));
    }
    filterOldData() {
        this.store = this.store.filter(Checklist.oldDataFilter);
        this.persistData();
    }
    static getStore() {
        let store = JSON.parse(localStorage.getItem('checkStore'));
        const checklist = Array.isArray(store) ? store : [];
        return checklist;
    }
    static getDone() {
        let done = JSON.parse(localStorage.getItem('checkStoreDone'));
        return Number.isFinite(done) ? done : 0;
    }
    static oldDataFilter(data) {
        if ((data === null || data === void 0 ? void 0 : data.dateTime) && (Date.now() - (data === null || data === void 0 ? void 0 : data.dateTime)) > 24 * 60 * 60) {
            return true;
        }
        else {
            return false;
        }
    }
}
export { Checklist };
