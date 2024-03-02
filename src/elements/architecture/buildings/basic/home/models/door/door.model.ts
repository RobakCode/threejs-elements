import * as THREE from "three";

import { BasicModel } from "@/shared/BasicModel/BasicModel";

export class DoorModel extends BasicModel {
  public defaultMaterial: THREE.MeshMatcapMaterial =
    new THREE.MeshMatcapMaterial({
      color: "brown",
      transparent: true,
      opacity: 1,
      depthWrite: true,
      depthTest: true,
    });

  private createDoorFrame(): THREE.Mesh {
    const doorFrameShape = new THREE.Shape();
    doorFrameShape.moveTo(this.dm(-1), this.dm(1.5));
    doorFrameShape.lineTo(this.dm(-1), this.dm(-2));
    doorFrameShape.lineTo(this.dm(1), this.dm(-2));
    doorFrameShape.lineTo(this.dm(1), this.dm(1.5));
    doorFrameShape.quadraticCurveTo(
      this.dm(1),
      this.dm(2),
      this.dm(0.5),
      this.dm(2)
    );
    doorFrameShape.lineTo(this.dm(-0.5), this.dm(2));
    doorFrameShape.quadraticCurveTo(
      this.dm(-1),
      this.dm(2),
      this.dm(-1),
      this.dm(1.5)
    );

    const doorFrameHole = new THREE.Path();
    doorFrameHole.moveTo(this.dm(-0.7), this.dm(-2));
    doorFrameHole.lineTo(this.dm(-0.7), this.dm(1.4));
    doorFrameHole.quadraticCurveTo(
      this.dm(-0.7),
      this.dm(1.7),
      this.dm(-0.5),
      this.dm(1.7)
    );
    doorFrameHole.lineTo(this.dm(0.5), this.dm(1.7));
    doorFrameHole.quadraticCurveTo(
      this.dm(0.7),
      this.dm(1.7),
      this.dm(0.7),
      this.dm(1.4)
    );
    doorFrameHole.lineTo(this.dm(0.7), this.dm(-2));
    doorFrameShape.holes.push(doorFrameHole);

    const doorFrameExtrudeSettings = {
      steps: this.dm(2),
      depth: this.dm(0.025),
      bevelEnabled: false,
    };

    const doorFrameGeometry = new THREE.ExtrudeGeometry(
      doorFrameShape,
      doorFrameExtrudeSettings
    );

    const doorFrameModel = new THREE.Mesh(
      doorFrameGeometry,
      this.defaultMaterial
    );
    doorFrameModel.position.set(0, this.dm(-3), this.dm(0.025));

    return doorFrameModel;
  }

  private createDoor(): THREE.Mesh {
    const doorShape = new THREE.Shape();
    doorShape.moveTo(this.dm(-0.7), this.dm(-2));
    doorShape.lineTo(this.dm(-0.7), this.dm(1.4));
    doorShape.quadraticCurveTo(
      this.dm(-0.7),
      this.dm(1.7),
      this.dm(-0.5),
      this.dm(1.7)
    );
    doorShape.lineTo(this.dm(0.5), this.dm(1.7));
    doorShape.quadraticCurveTo(
      this.dm(0.7),
      this.dm(1.7),
      this.dm(0.7),
      this.dm(1.4)
    );
    doorShape.lineTo(this.dm(0.7), this.dm(-2));

    const doorExtrudeSettings = {
      steps: this.dm(2),
      depth: this.dm(0.05),
      bevelEnabled: false,
    };

    const doorGeometry = new THREE.ExtrudeGeometry(
      doorShape,
      doorExtrudeSettings
    );
    const doorMaterial = new THREE.MeshMatcapMaterial({
      color: "black",
      transparent: true,
      opacity: 1,
    });

    const doorModel = new THREE.Mesh(doorGeometry, doorMaterial);
    doorModel.position.set(0, this.dm(-3), this.dm(0.025));

    return doorModel;
  }

  public getModel(): THREE.Group {
    this.model.add(this.createDoorFrame());
    this.model.add(this.createDoor());

    return this.model;
  }
}
