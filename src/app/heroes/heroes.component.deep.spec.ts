import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent (deep tests)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES = [
    { id: 1, name: "SpiderDude", strength: 8 },
    { id: 2, name: "WonderGirl", strength: 24 },
    { id: 3, name: "SuperDude", strength: 55 },
  ];
  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);


   
  });

  it("should render each as a HeroComponent", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponents.length).toBe(3);
    expect(heroComponents[0].componentInstance.hero.name).toEqual('SpiderDude')
    //can loop here
  });
});
