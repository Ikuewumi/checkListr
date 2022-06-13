import { Checklist } from './Checklist.js';
console.log('Using TypeScript');
const taskForm = document.querySelector('form');
const taskList = document.querySelector('#tasklist ul');
const doneElement = document.querySelector('#done');
const activeElement = document.querySelector('#active');
document.addEventListener('DOMContentLoaded', _ => {
    const checklist = new Checklist(taskList, doneElement, activeElement);
    checklist.init();
    taskForm.onsubmit = (e) => {
        e.preventDefault();
        const textElement = taskForm.task;
        if (!textElement)
            return;
        checklist.addTask(textElement.value.trim());
        textElement.value = '';
    };
    taskList.onclick = (e) => {
        var _a;
        const target = e.target;
        let element = null;
        if (target.tagName !== 'svg' && target.tagName !== 'use') {
            return;
        }
        if (target.tagName === 'use') {
            element = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        }
        else if (target.tagName === 'svg') {
            element = target.parentElement;
        }
        checklist.removeTask(element);
    };
});
