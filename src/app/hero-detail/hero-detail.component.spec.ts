import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe("HeroDetailComponent", () => {
  let mockActivateRoute, mockHeroService, mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;
  beforeEach(() => {
    mockActivateRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return "3";
          },
        },
      },
    };
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivateRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "SuperDude", strength: 100 })
    );
  });

  it("should render hero name in a h2 tag", () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("h2").textContent).toContain(
      "SUPERDUDE"
    );
  });

  // it("should call updateHero when save is called", fakeAsync(() => {
  //   mockHeroService.updateHero.and.returnValue(of({}));
  //   fixture.detectChanges();

  //   fixture.componentInstance.save();
  //   flush();
  //   // tick(250);

  //   expect(mockHeroService.updateHero).toHaveBeenCalled();
  // }));

  it(
    "should call updateHero when save is called",
    waitForAsync(() => {
      mockHeroService.updateHero.and.returnValue(of({}));
      fixture.detectChanges();

      fixture.componentInstance.save();
      // flush();
      // tick(250);
      fixture.whenStable().then(() => {
        expect(mockHeroService.updateHero).toHaveBeenCalled();
      });
    })
  );
});
