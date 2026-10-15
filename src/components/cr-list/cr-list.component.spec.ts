import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrListComponent } from './cr-list.component';
import { SessionService } from '../../session/session.service';
import { users } from '../../api/fixtures';
import { ReqUser } from '../../models/cr.models';
import { CrApiService } from '../../api/cr-api.service';

const flush = () => new Promise((r) => setTimeout(r, 0));

async function render(user: ReqUser): Promise<ComponentFixture<CrListComponent>> {
	TestBed.configureTestingModule({
		imports: [CrListComponent],
		providers: [{ provide: SessionService, useValue: { user } }],
	});
	await TestBed.compileComponents();
	const fixture = TestBed.createComponent(CrListComponent);
	fixture.detectChanges(); // ngOnInit -> load()
	await flush(); // let the mock API resolve
	fixture.detectChanges(); // render the loaded/empty state
	return fixture;
}

describe('CrListComponent', () => {
	it('renders a row per change request in the user org', async () => {
		const fixture = await render(users.approver);
		expect(fixture.nativeElement.querySelectorAll('.cr-list__row').length).toBe(3); // org-alpha: CR-1, CR-2, CR-3
	});

	it('shows the empty state when the org has no change requests', async () => {
		const fixture = await render({ id: 'x', orgCode: 'org-empty', policies: ['cr_r_o'] });
		expect(fixture.nativeElement.querySelector('.cr-list__empty')).not.toBeNull();
		expect(fixture.nativeElement.querySelector('.cr-list__table')).toBeNull();
	});

	it('shows an error with a Retry button when loading fails', async () => {
		const fixture = await render(users.approver);
		TestBed.inject(CrApiService).failNext = true;

		void fixture.componentInstance.load(); 
		await flush();
		fixture.detectChanges();

		expect(fixture.nativeElement.querySelector('.cr-list__error').textContent).toContain('Network error');
		expect(fixture.nativeElement.querySelector('.cr-list__error button')).not.toBeNull();
		expect(fixture.nativeElement.querySelector('.cr-list__table')).toBeNull();
	});

	it('shows every row again when switching back to ALL', async () => {
		const fixture = await render(users.approver);
		const select: HTMLSelectElement = fixture.nativeElement.querySelector('.cr-list__filter');

		select.value = 'APPLIED';
		select.dispatchEvent(new Event('change'));
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelectorAll('.cr-list__row').length).toBe(1);

		select.value = 'ALL';
		select.dispatchEvent(new Event('change'));
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelectorAll('.cr-list__row').length).toBe(3);
	});

	it('shows a "no match" message when nothing matches the filter', async () => {
		const fixture = await render(users.approver);

		const select: HTMLSelectElement = fixture.nativeElement.querySelector('.cr-list__filter');
		select.value = 'REJECTED';
		select.dispatchEvent(new Event('change'));
		fixture.detectChanges();

		expect(fixture.nativeElement.querySelectorAll('.cr-list__row').length).toBe(0);
		expect(fixture.nativeElement.querySelector('.cr-list__no-matches')).not.toBeNull();
	});
});
