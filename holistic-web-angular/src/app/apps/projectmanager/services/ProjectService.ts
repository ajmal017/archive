import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import Spark from '../../../services/Spark';
import Project from '../models/Project';
import Stage from '../models/Stage';

@Injectable()
export default class ProjectService{

    public path: string = 'projects/';
    
    private _projects: BehaviorSubject<Project[]>;
    private dataStore: {
        projects: Project[];
    }

    constructor(private spark: Spark){
        this.dataStore = { projects: [] }
    }

    /**
     * Loads all users from datastore and listens for update
     */
    loadAll(){
        this.spark.subscribeToArray(this.path, projects => {
            let sanitized = [];
            projects.forEach(project => {
                sanitized.push(this.projectFactory(project));
            })
            this.dataStore.projects = sanitized;
            this._projects.next(this.dataStore.projects);
        });
    }

    projectFactory(obj: Object): Project{
        let project = new Project();
        Object.values(obj).forEach((value, i) => {
            project[Object.keys(obj)[i]] = value;
        });
        if (project.stages) {
            project.stages.forEach((stage, i) => {
                project.stages[i] = this.stageFactory(stage);
            });
        }
        return project;
    }

    stageFactory(obj: Object): Stage{
        let stage = new Stage();
        Object.values(obj).forEach((value, i) => {
            stage[Object.keys(obj)[i]] = value;
        })
        return stage;
    }

}